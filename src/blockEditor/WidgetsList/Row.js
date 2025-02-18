/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import React, { useCallback } from "react";
import TemplateIcon from "./TemplateIcon";
import { Button } from "@wordpress/components";
import appConfig from "../../config/appConfig";

/**
 *
 * @param {object} widget
 * @param {string} widget.name
 * @param {string} widget.uuid
 * @param {string} widget.widget_type
 * @param {string} widget.template
 * @param {function} onSelect
 * @returns {Element}
 * @constructor
 */
const Row = ({ widget, onSelect }) => {
	/**
	 *
	 * @type {(function(*): void)|*}
	 */
	const onWidgetSelect = useCallback(
		(e) => {
			e.preventDefault();
			onSelect(widget);
		},
		[onSelect]
	);

	return (
		<div className={"rev-block-editor-widgets-list-container-item"}>
			<div className={"rev-block-editor-widgets-list-container-item-title"}>
				{widget.name}
			</div>
			<div className={"rev-block-editor-widgets-list-container-item-subtitle"}>
				<TemplateIcon
					template={widget.template}
					widgetType={widget.widget_type}
				/>
			</div>
			<div className={"rev-block-editor-widgets-list-container-item-actions"}>
				<Button variant={"primary"} onClick={onWidgetSelect} size={"small"}>
					Insert
				</Button>
				<a href={`${appConfig.appUrl}/c/${widget.slug}`} target={widget.slug}>
					<Button variant={"secondary"} size={"small"}>
						Preview
					</Button>
				</a>
				<a
					href={`${appConfig.appUrl}/calendar/${widget.uuid}`}
					target={widget.uuid}
				>
					<Button variant={"tertiary"} size={"small"}>
						Edit
					</Button>
				</a>
			</div>
		</div>
	);
};

export default Row;
