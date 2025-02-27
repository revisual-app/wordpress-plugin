/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import React from "react";
import { Card, CardBody, TabPanel } from "@wordpress/components";
import { useCallback, useMemo, useState } from "@wordpress/element";
import PublishedWidgetsTab from "./PublishedWidgetsTab";
import { useWidgetsStore } from "../../../hooks/useWidgets";
import UnavailableWidgetsTab from "./UnavailableWidgetsTab";
import AddNewButton from "../../../components/AddNewButton";
import RefreshWidgetsList from "../../../components/RefreshWidgetsList";

export const AvailableTabs = [
	{
		name: "published",
		title: "Published",
		filter: (widget) => widget.available === 1 && widget.integration,
	},
	{
		name: "unavailable",
		title: "Unavailable",
		filter: (widget) => widget.available === 0 || !widget.integration,
	},
];

const ComponentsTabsMapping = {
	["published"]: PublishedWidgetsTab,
	["unavailable"]: UnavailableWidgetsTab,
};

const WidgetTab = (props) => {
	const onTabChange = useCallback((tab) => {}, []);
	const [currentTab, setCurrentTab] = useState();
	const { widgets } = useWidgetsStore();

	const tab = useCallback(
		(tab) => {
			const Component = ComponentsTabsMapping[tab.name];
			return <Component widgetType={props.name} {...tab} />;
		},
		[currentTab, props.name, widgets.collection]
	);

	const tabs = useMemo(() => {
		return AvailableTabs.map((tab) => {
			const widgetsCount = widgets.collection
				.filter(tab.filter)
				.filter((i) => i.widget_type === props.name).length;

			return {
				...tab,
				title: `${tab.title} (${widgetsCount})`,
			};
		});
	}, [widgets.collection]);

	const noCalendarsContent = useMemo(() => {
		return (
			<div className={"rev-widgets-tab-no-widgets"}>
				<p>You have no {props.title} widgets...</p>
				<img
					src={"/wp-content/plugins/revisual/public/rev/img/welcome_image.png"}
				/>
				<AddNewButton widgetType={props.name} />
			</div>
		);
	}, [props.name]);

	const content =
		widgets.fetchSuccess && !widgets.collection.length ? (
			noCalendarsContent
		) : (
			<TabPanel
				onSelect={onTabChange}
				tabs={tabs}
				className={
					"rev-widgets-selector-panel rev-widgets-availability-selector-panel"
				}
			>
				{tab}
			</TabPanel>
		);

	return (
		<>
			<Card className={""} isRounded={false}>
				<CardBody>
					<div className={"rev-widgets-selector-panel-header"}>
						<h2 className={""}>{props.title}</h2>
						<RefreshWidgetsList showLabel={true} variant={"tertiary"} />
					</div>

					{content}
				</CardBody>
			</Card>
		</>
	);
};

export default WidgetTab;
