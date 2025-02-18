/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/01/2025
 */

import React from "react";
import WidgetsTable from "./WidgetsTable";
import { WidgetsNames } from "../../../consts";

const widgetsFilter = (widget) => widget.available === 0 || !widget.integration;
const UnavailableWidgetsTab = (props) => {
	return (
		<>
			<div>
				<p>
					Here you can find all {WidgetsNames[props.widgetType].title} that are
					not available.
				</p>
				<p variant={"secondary"}>
					If calendar is on the list - pleas double check, if widget is properly
					integrated and has status set as published.
				</p>
			</div>
			<WidgetsTable
				widgetType={props.widgetType}
				filterPredicate={widgetsFilter}
				hideColumns={["Integration", "Actions-Canvas"]}
			/>
		</>
	);
};

export default UnavailableWidgetsTab;
