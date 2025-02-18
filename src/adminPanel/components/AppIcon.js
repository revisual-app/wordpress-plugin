/**
 * Created by piotr.pozniak@thebeaverhead.com on 06/01/2025
 */

import React from "react";
import { useWPSettingsStore } from "../../hooks/useWPSettings";

/**
 *
 * @param {string} width
 * @param {string=""} address
 * @returns {Element}
 * @constructor
 */
export const AppIconRaw = ({ width = "100%", address = "" }) => {
	return (
		<img
			width={width}
			src={`${address}/wp-content/plugins/revisual/public/rev/img/icon.png`}
			alt={"Reviseual icon"}
			aria-label={"Reviseual icon"}
			title={"Reviseual icon"}
		/>
	);
};

/**
 *
 * @param {string} width
 * @returns {Element}
 * @constructor
 */
const AppIcon = ({ width = "100%" }) => {
	const { wpSettings } = useWPSettingsStore();
	return (
		<AppIconRaw
			address={wpSettings.model?.pageUrl || ""}
			width={width}
		></AppIconRaw>
	);
};

export default AppIcon;
