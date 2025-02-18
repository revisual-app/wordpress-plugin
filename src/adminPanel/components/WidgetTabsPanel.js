/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/01/2025
 */

import React from "react";
import { useCallback, useState } from "@wordpress/element";
import { useWidgetsStore } from "../../hooks/useWidgets";
import InitialLoading from "./InitialLoading";
import { TabPanel } from "@wordpress/components";
import { AvailableWidgets } from "../../consts";

const WidgetTabsPanel = ({ children, onTabChange }) => {
	const [currentTab, setCurrentTab] = useState();
	const { widgets } = useWidgetsStore();

	/**
	 *
	 * @type {(function(*): void)|*}
	 */
	const _onTabChange = useCallback(
		(tab) => {
			setCurrentTab(tab);
			if (onTabChange === undefined) {
				return;
			}
			onTabChange(tab);
		},
		[widgets.collection, currentTab]
	);

	if (widgets.fetch && !widgets.collection.length) {
		return <InitialLoading />;
	}

	return (
		<>
			<TabPanel
				onSelect={_onTabChange}
				tabs={AvailableWidgets}
				className={"rev-widgets-selector-panel"}
			>
				{children}
			</TabPanel>
		</>
	);
};

export default WidgetTabsPanel;
