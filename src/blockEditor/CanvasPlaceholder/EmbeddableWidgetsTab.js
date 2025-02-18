/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/01/2025
 */

import React from "react";
import { WidgetsNames } from "../../consts";
import WidgetsTable from "../../adminPanel/components/widgetsPanel/WidgetsTable";
import { useWidgetsStore } from "../../hooks/useWidgets";
import { widgetsFilter } from "../../adminPanel/components/widgetsPanel/PublishedWidgetsTab";
import { useMemo } from "@wordpress/element";

/**
 *
 * @param {string} widgetType
 * @param {function} onSelectWidget
 * @returns {Element}
 * @constructor
 */
const PublishedWidgetsTab = ({ widgetType, onSelectWidget }) => {
	const { widgets } = useWidgetsStore();

	const unavailableWidgetsCount = useMemo(() => {
		return (
			widgets.collection.length -
			widgets.collection.filter(widgetsFilter).length
		);
	}, [widgets.collection]);

	const unavailableWidgetsInfo = unavailableWidgetsCount ? (
		<>
			You have also {unavailableWidgetsCount} unavailable {widgetType}s.
		</>
	) : null;

	return (
		<>
			<div>
				<p>
					Here you can find all of your <strong>Integrated</strong> and{" "}
					<strong>Published</strong> {WidgetsNames[widgetType].title}.{" "}
					{unavailableWidgetsInfo}
				</p>
				<p className={"rev-p_secondary"}>
					If calendar is not on the list - pleas double check, if widget is
					properly integrated and has status set as published.
				</p>
			</div>
			<WidgetsTable
				widgetType={widgetType}
				filterPredicate={widgetsFilter}
				hideColumns={["Integration", "Status", "Actions"]}
				onSelect={onSelectWidget}
			/>
		</>
	);
};

export default PublishedWidgetsTab;
