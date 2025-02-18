/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";
import appConfig from "../config/appConfig";
import { Button, Icon } from "@wordpress/components";
import { AvailableWidgets, WidgetsNames } from "../consts";

/**
 *
 * @param {string} widgetType
 * @param {string="primary"} variant
 * @returns {Element}
 * @constructor
 */
const AddNewButton = ({ widgetType, variant = "primary" }) => {
	const widgetConfig = AvailableWidgets.find((i) => i.name === widgetType);

	return (
		<Button
			variant={variant}
			href={appConfig.appUrl + widgetConfig.newItemUrl}
			target={`_new_${widgetType}`}
		>
			Create {WidgetsNames[widgetType].singular}&nbsp;
			<Icon icon={"external"} size={13}></Icon>
		</Button>
	);
};

export default AddNewButton;
