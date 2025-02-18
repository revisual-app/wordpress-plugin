/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";
import { Button, Tooltip } from "@wordpress/components";
import { ReactComponent as RefreshIcon } from "../icons/refresh.svg";
import { useWidgetsStore } from "../hooks/useWidgets";
import { useCallback } from "@wordpress/element";

/**
 * @param {string="icon"} variant
 * @returns {Element}
 * @constructor
 */
const RefreshWidgetsList = ({ variant = "icon", showLabel = false }) => {
	const { fetchWidgets } = useWidgetsStore();

	const onClick = useCallback(() => {
		fetchWidgets();
	}, [fetchWidgets]);

	return (
		<Tooltip text={"Refresh widgets list"}>
			<Button
				variant={variant}
				icon={RefreshIcon}
				onClick={onClick}
				text={showLabel && "Refresh"}
			></Button>
		</Tooltip>
	);
};

export default RefreshWidgetsList;
