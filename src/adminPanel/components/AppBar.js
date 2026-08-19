/**
 * Connected-state app bar: mark, screen nav, session card.
 * Replaces the old .rev-app-panel-header (a bare <Heading> + SessionPanel row).
 */

import React from "react";
import { AvailableWidgets } from "../../consts";
import SessionCard from "./SessionCard";
import { AppIconRaw } from "./AppIcon";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import appConfig from "../../config/appConfig";

/**
 * @param {string} screen        active screen id ("dashboard" or a widget type)
 * @param {function} onNavigate
 * @returns {Element}
 * @constructor
 */
const AppBar = ({ screen, onNavigate }) => {
	const { wpSettings } = useWPSettingsStore();

	const tabs = [{ name: "dashboard", title: "Dashboard" }, ...AvailableWidgets];

	return (
		<div className={"rev--appbar"}>
			<div className={"rev--appbar-left"}>
				<a
					href={appConfig.appUrl}
					target={"_revisual"}
					className={"rev--appbar-mark"}
					aria-label={`Open ${appConfig.appName}`}
				>
					<AppIconRaw
						address={wpSettings.model?.pageUrl || ""}
						width={"28px"}
					/>
				</a>
				<nav className={"rev--appbar-nav"} aria-label={"Plugin screens"}>
					{tabs.map((tab) => (
						<button
							key={tab.name}
							type={"button"}
							className={`rev--appbar-tab${
								screen === tab.name ? " is-active" : ""
							}`}
							aria-current={screen === tab.name ? "page" : undefined}
							onClick={() => onNavigate(tab.name)}
						>
							{tab.title}
						</button>
					))}
				</nav>
			</div>
			<SessionCard />
		</div>
	);
};

export default AppBar;
