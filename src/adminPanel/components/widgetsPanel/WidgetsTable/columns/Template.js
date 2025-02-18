/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";
import TemplateIcon from "../../../../../blockEditor/WidgetsList/TemplateIcon";

/**
 *
 * @param {object} row
 * @returns {Element}
 * @constructor
 */
const Template = ({ row }) => {
	return <TemplateIcon template={row.template} widgetType={row.widget_type} />;
};

export default Template;
