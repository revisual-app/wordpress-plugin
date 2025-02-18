/**
 * Created by piotr.pozniak@thebeaverhead.com on 03/02/2025
 */

import React from "react";

/**
 *
 * @param {string} actionLabel
 * @param {Object} actionComponent
 * @param {string} actionVariant
 * @param {function} onAction
 * @returns {React.JSX.Element|null}
 * @constructor
 */
const Action = ({ actionLabel, actionComponent, actionVariant, onAction }) => {
	if (actionComponent) {
		return (
			<div
				className={`rev-session-panel-org-action ${
					actionVariant ? "rev-session-panel-org-action_" + actionVariant : ""
				}`}
				onClick={onAction}
			>
				{actionComponent}
			</div>
		);
	}

	return actionLabel ? (
		<div
			className={`rev-session-panel-org-action ${
				actionVariant ? "rev-session-panel-org-action_" + actionVariant : ""
			}`}
			onClick={onAction}
		>
			<a
				href={`#${actionLabel}`}
				onClick={onAction}
				target={"_self"}
				rel={"nofollow"}
			>
				{actionLabel}
			</a>
		</div>
	) : null;
};

export default Action;
