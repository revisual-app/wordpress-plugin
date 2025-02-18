/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/02/2025
 */

import React from "react";
import { Card, CardBody, CardHeader } from "@wordpress/components";
import AppIcon from "../../adminPanel/components/AppIcon";
import { __ } from "@wordpress/i18n";
import AddNewButton from "../../components/AddNewButton";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";

/**
 *
 * @param {string} widgetType
 * @returns {Element}
 * @constructor
 */
const NoWidgetsPlaceholder = ({ widgetType }) => {
	return (
		<Card isRounded={false}>
			<CardHeader>
				<div className={"rev-block-canvas-placeholder-header"}>
					<div className={"rev-block-canvas-placeholder-title"}>
						<span>
							<AppIcon width={"24"} />
							{__("Revisual Widget", "revisual")}
						</span>
						<RefreshWidgetsList widgetType={widgetType} />
					</div>
					<div className={"rev-block-canvas-placeholder-subtitle"}>
						Select widget which you want to display.
					</div>
				</div>
			</CardHeader>
			<CardBody>
				<div className={"rev-block-canvas-no-widgets-container"}>
					You have no Calendars widgets...
					<AddNewButton widgetType={widgetType} />
				</div>
			</CardBody>
		</Card>
	);
};

export default NoWidgetsPlaceholder;
