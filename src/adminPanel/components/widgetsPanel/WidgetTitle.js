/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import React from "react";
import NewWidgetLink from "./NewWidgetLink";

/**
 *
 * @param {string} label
 * @returns {Element}
 * @constructor
 */
const WidgetTitle = ({ label }) => {
	return (
		<span>
			{label} <NewWidgetLink />
		</span>
	);
};

export default WidgetTitle;
