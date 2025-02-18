/**
 * Created by piotr.pozniak@thebeaverhead.com on 06/01/2025
 */

import React from "react";
import Action from "./Action";

/**
 *
 * @param {string} heading
 * @param {string} subtitle
 * @param {string} actionLabel
 * @param {Object} actionComponent
 * @param {function} onAction
 * @param {string} actionVariant
 * @returns {Element}
 * @constructor
 */
const InfoBlock = ({
	heading,
	subtitle,
	actionLabel,
	actionComponent,
	onAction,
	actionVariant = "",
}) => {
	return (
		<>
			<div className={"rev-session-panel-info"}>
				<div className={"rev-session-panel-title"}>{heading}</div>
				<div className={"rev-session-panel-org-subtitle"}>{subtitle}</div>
			</div>
			<Action
				actionLabel={actionLabel}
				actionComponent={actionComponent}
				onAction={onAction}
				actionVariant={actionVariant}
			/>
		</>
	);
};

export default InfoBlock;
