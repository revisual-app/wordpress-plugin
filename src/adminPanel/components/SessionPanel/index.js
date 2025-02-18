/**
 * Created by piotr.pozniak@thebeaverhead.com on 06/01/2025
 */

import React from "react";
import AppIcon from "./../AppIcon";
import { useSettingsAppStore } from "../../../hooks/useSettingsApp";
import { useOrgInfoStore } from "../../../hooks/useOrgInfo";
import { useCallback, useEffect } from "@wordpress/element";
import InfoBlock from "./InfoBlock";
import { useWPSettingsStore } from "../../../hooks/useWPSettings";
import { Spinner } from "@wordpress/components";
import appConfig from "../../../config/appConfig";

const SessionPanel = ({}) => {
	const { disconnectPlugin } = useSettingsAppStore();

	const { orgInfo, fetchOrgInfo } = useOrgInfoStore();
	const { wpSettings } = useWPSettingsStore();

	useEffect(() => {
		if (wpSettings.revokeTokenUrl) {
			window.location = wpSettings.revokeTokenUrl;
		}
	}, [wpSettings.revokeTokenUrl]);

	/**
	 *
	 * @type {function(*): boolean}
	 */
	const onDisconnect = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		disconnectPlugin();
		return false;
	}, []);

	/**
	 *
	 * @type {function(*): boolean}
	 */
	const onReConnect = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location = wpSettings.model.authUrl;
			return false;
		},
		[orgInfo.model],
	);

	/**
	 *
	 * @type {function(*): boolean}
	 */
	const onLogin = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location = wpSettings.model.authUrl;
			return false;
		},
		[orgInfo.model],
	);

	let content = (
		<InfoBlock
			heading={"Revisual is loading"}
			subtitle={"Pulling your account information..."}
		/>
	);

	if (orgInfo.fetchError) {
		if (
			!wpSettings.model ||
			!wpSettings.model?.apiKey ||
			wpSettings.model?.apiKey === "undefined"
		) {
			// problem with api key not present? need to login
			content = (
				<InfoBlock
					heading={"Revisual misconfigured"}
					subtitle={"You need to login to Revisual"}
					actionLabel={"Login"}
					actionVariant={"primary"}
					onAction={onLogin}
				/>
			);
		} else {
			content = (
				<InfoBlock
					heading={"Revisual not connected"}
					subtitle={"Could not connect to Revisual"}
					actionLabel={"Re-connect"}
					actionVariant={"success"}
					onAction={onReConnect}
				/>
			);
		}
	} else if (orgInfo.fetchSuccess) {
		content = (
			<InfoBlock
				heading={"Revisual connected"}
				subtitle={orgInfo.model.name}
				actionComponent={wpSettings.revokeTokenUrlFetch ? <Spinner /> : null}
				actionLabel={"Disconnect"}
				onAction={onDisconnect}
			/>
		);
	}
	return (
		<div className={"rev-session-panel"}>
			<div>
				<a
					href={appConfig.appUrl}
					target={appConfig.appUrl}
					className={"rev-session-panel-link-home"}
				>
					<AppIcon width={"34px"} />
				</a>
			</div>
			{content}
		</div>
	);
};

export default SessionPanel;
