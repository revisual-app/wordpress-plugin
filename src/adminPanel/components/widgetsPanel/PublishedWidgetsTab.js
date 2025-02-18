/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/01/2025
 */

import React from "react";
import WidgetsTable from "./WidgetsTable";
import { WidgetsNames } from "../../../consts";

export const widgetsFilter = (widget) =>
	widget.available === 1 && widget.integration;

/**
 * @param {string} widgetType
 * @returns {Element}
 * @constructor
 */
const PublishedWidgetsTab = ({ widgetType }) => {
	return (
		<>
			<div>
				<p>
					Here you can find all of your <strong>Integrated</strong> and{" "}
					<strong>Published</strong> {WidgetsNames[widgetType].title}.
				</p>
				<p variant={"secondary"}>
					If calendar is not on the list - pleas double check, if widget is
					properly integrated and has status set as published.
				</p>
			</div>
			<WidgetsTable
				widgetType={widgetType}
				filterPredicate={widgetsFilter}
				hideColumns={["Integration", "Status", "Actions-Canvas"]}
			/>
		</>
	);
};

export default PublishedWidgetsTab;
