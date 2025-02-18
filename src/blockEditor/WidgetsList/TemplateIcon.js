/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import { AvailableTemplates } from "../../consts";

/**
 *
 * @param {string} template
 * @param {string} widgetType
 * @returns {Element}
 * @constructor
 */
const TemplateIcon = ({ template, widgetType }) => {
	return AvailableTemplates[widgetType].find((i) => i.template === template)
		.label;
};

export default TemplateIcon;
