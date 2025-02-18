/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";
import { Button, Flex } from "@wordpress/components";
import { useCallback } from "@wordpress/element";

/**
 *
 * @param row
 * @param {function} onSelect
 * @returns {Element}
 * @constructor
 */
const Actions = ({ row, onSelect }) => {
	/**
	 *
	 * @type {(function(): void)|*}
	 */
	const onInsert = useCallback(() => {
		console.log("onInsert", row, onSelect);
		onSelect(row);
	}, [onSelect, row]);

	return (
		<Flex justify={"flex-start"}>
			<Button variant={"secondary"} size={"small"} onClick={onInsert}>
				Insert
			</Button>
			{/*<DropdownMenu
				controls={[
					{
						icon: "edit",
						onClick: onOpenInApp,
						title: `Edit in ${appConfig.appName}`,
					},
					{
						icon: "admin-links",
						onClick: onCopyShareableUrl,
						title: "Copy shareable URL",
					},
				]}
				icon={ThreeDotsHorizontal}
				label="Widget actions."
			/>*/}
		</Flex>
	);
};

export default Actions;
