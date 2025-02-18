/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";
import { Button, DropdownMenu, Flex } from "@wordpress/components";
import appConfig from "../../../../../config/appConfig";
import ThreeDotsHorizontal from "../../../icons/ThreeDotsHorizontal";
import { useCallback } from "@wordpress/element";
import {
	copyTextToClipboard,
	getShortCode,
	ucFirst,
} from "../../../../../utils";
import { toast } from "sonner";

const Actions = ({ row }) => {
	const onCopyToClipboard = useCallback((e) => {
		e.preventDefault();

		copyTextToClipboard(getShortCode(row.widget_type, row.uuid, row.template));
		toast("Shortcode copied to clipboard.");
	}, []);

	/**
	 *
	 * @type {(function(): void)|*}
	 */
	const onOpenInApp = useCallback(() => {
		window.open(
			`${appConfig.appUrl}/${widgetType}/${row.uuid}`,
			`_edit-${row.uuid}`,
		);
	}, []);

	/**
	 *
	 * @type {(function(): void)|*}
	 */
	const onCopyShareableUrl = useCallback(() => {
		copyTextToClipboard(`${appConfig.appUrl}/${widgetType}/${row.uuid}`);
		toast(`${ucFirst(widgetType)}'s link copied to clipboard.`);
	}, []);

	return (
		<Flex justify={"flex-start"}>
			<Button variant={"secondary"} size={"small"} onClick={onCopyToClipboard}>
				Copy shortcode
			</Button>
			<DropdownMenu
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
			/>
		</Flex>
	);
};

export default Actions;
