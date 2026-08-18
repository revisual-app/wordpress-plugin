/**
 * Calendars screen — page header over the one calendars table.
 *
 * Replaces widgetsPanel/index.js + WidgetTab.js + Published/UnavailableWidgetsTab.js.
 * The old screen nested two <TabPanel>s (widget type, then availability); widget
 * type is now the app-bar nav and availability is a filter inside the table
 * toolbar, so both TabPanels are gone.
 */

import React from "react";
import PageHeader from "../PageHeader";
import WidgetsTable from "./WidgetsTable";
import RefreshWidgetsList from "../../../components/RefreshWidgetsList";
import AddNewButton from "../../../components/AddNewButton";
import { WidgetsNames } from "../../../consts";

const CalendarsPanel = ({ widgetType = "calendar" }) => (
	<>
		<PageHeader
			title={WidgetsNames[widgetType].title}
			subtitle={`Copy a shortcode to place any published ${WidgetsNames[
				widgetType
			].singular.toLowerCase()} on your site.`}
			actions={
				<>
					<RefreshWidgetsList showLabel={true} />
					<AddNewButton widgetType={widgetType} />
				</>
			}
		/>
		<WidgetsTable widgetType={widgetType} />
	</>
);

export default CalendarsPanel;
