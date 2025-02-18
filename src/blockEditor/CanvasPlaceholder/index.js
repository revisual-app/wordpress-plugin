/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2024
 */

import React from "react";
import { Card, CardBody, CardHeader } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useCallback } from "@wordpress/element";
import AppIcon from "../../adminPanel/components/AppIcon";
import EmbeddableWidgetsTab from "./EmbeddableWidgetsTab";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";

/**
 *
 * @param {string} widgetType
 * @param {function} setAttributes
 * @returns {Element}
 * @constructor
 */
const Placeholder = ({ widgetType, setAttributes }) => {
	/**
	 *
	 * @type {(function(*): void)|*}
	 */
	const onSelect = useCallback(
		(widget) => {
			setAttributes({
				widget_type: widget.widget_type,
				widgetType: widget.widget_type,
				uuid: widget.uuid,
				template: widget.template,
				widgetSlug: widget.slug,
			});
		},
		[setAttributes]
	);

	return (
		<div className={"rev-block-canvas-placeholder"}>
			<Card isRounded={false}>
				<CardHeader>
					<div className={"rev-block-canvas-placeholder-header"}>
						<div className={"rev-block-canvas-placeholder-title"}>
							<span>
								<AppIcon width={"24"} />
								{__("Revisual Widget", "revisual")}
							</span>
							<RefreshWidgetsList />
						</div>
						<div className={"rev-block-canvas-placeholder-subtitle"}>
							Select widget which you want to display.
						</div>
					</div>
				</CardHeader>
				<CardBody>
					<div className={"rev-block-canvas-placeholder-container"}>
						<EmbeddableWidgetsTab
							widgetType={widgetType}
							onSelectWidget={onSelect}
						/>
					</div>
					{/*<WidgetsTable onSelect={onSelect} widgetType={widgetType} />*/}
				</CardBody>
			</Card>
		</div>
	);
};

export default Placeholder;
