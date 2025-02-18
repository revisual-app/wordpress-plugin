/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import React from "react";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import { useOrgInfoStore } from "../../hooks/useOrgInfo";
import WidgetsPanel from "./widgetsPanel";
import { __experimentalHeading as Heading } from "@wordpress/components";
import SessionPanel from "./SessionPanel";
import ApiKeyError from "./ApiKeyError";

const AppPanel = (props) => {
	const { orgInfo } = useOrgInfoStore();

	const widgetsPanel =
		orgInfo.model && !orgInfo.fetchError && !orgInfo.fetch ? (
			<WidgetsPanel />
		) : null;
	// const infoPanel = wpSettings.model.apiKey !== "" ? <InfoPanel /> : null;

	const apiKeyError =
		orgInfo.fetchError && orgInfo.fetchError.code === 401 ? (
			<ApiKeyError />
		) : null;

	return (
		<div>
			<div className={"rev-app-panel-header"}>
				<Heading className={"rev--page-heading"}>Dashboard</Heading>
				<SessionPanel />
			</div>
			<div>
				{widgetsPanel}
				{apiKeyError}
			</div>
		</div>
	);
};

export default AppPanel;
