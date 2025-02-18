/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/07/2024
 */

import React from "react";
import { useCallback, useMemo, useState } from "@wordpress/element";
import { AvailableTemplates } from "../../consts";
import { useWidgetsStore } from "../../hooks/useWidgets";
import Row from "./Row";
import { widgetsFilter } from "../../adminPanel/components/widgetsPanel/PublishedWidgetsTab";

/**
 *
 * @param {string} widgetType
 * @param {function} onSelect
 * @returns {Element}
 * @constructor
 */
const WidgetsList = ({ widgetType = "calendar", onSelect } = props) => {
	const { widgets } = useWidgetsStore();

	const widgetItems = useMemo(
		() =>
			widgets.collection
				.filter((i) => i.widget_type === widgetType)
				.filter(widgetsFilter),
		[widgetType, widgets.collection]
	);

	const items = widgetItems.map((item) => {
		return <Row key={item.uuid} widget={item} onSelect={onSelect} />;
	});

	return (
		<div className={"rev-block-editor-widgets-list-container"}>{items}</div>
	);
};

export default WidgetsList;
