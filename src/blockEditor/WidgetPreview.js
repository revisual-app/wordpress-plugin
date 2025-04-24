/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/07/2024
 */

import React from "react";
import { useEffect, useRef } from "@wordpress/element";
import {attachLoaderScript, attachScript, postMessageToContentWindow} from "../utils";
import appConfig from "../config/appConfig";

/**
 *
 * @param {string} widgetType
 * @param {string} uuid
 * @param {string} template
 * @param {string} widgetSlug
 * @returns {Element}
 * @constructor
 */
const WidgetPreview = ({ widgetType, uuid, template, widgetSlug }) => {
	const domRef = useRef(null);

	useEffect(() => {
		if (domRef.current) {
			postMessageToContentWindow({
				type: "dce-embeddable",
				widgetUUID: uuid,
				widgetType,
			});

			const dom =
				document.querySelector("iframe[name='editor-canvas']")?.contentWindow
					?.document?.head ||
				document.querySelector(".editor-canvas__iframe")?.contentWindow?.document
					?.head ||
				window.document.head;
			attachScript(appConfig.calendarScriptUrl, dom, `dce-embeddable-script`);

			return () => {
				postMessageToContentWindow({
					type: "dce-embeddable-unmount",
					widgetUUID: uuid,
					widgetType,
					unmount: true,
				});
				if (domRef.current && domRef.current.unmount) {
					domRef.current.html = "";
				}
			};
		}
	}, [domRef.current, uuid]);

	return (
		<div ref={domRef} className={"rev-widget-preview-block"}>
			{/*<div
				className="dce-calendar"
				id="08137447-b628-4e2a-a96c-db933f393920"
				iframe="true"
				slug="k7CzPUQK"
				data-wt="events_list"
			></div>*/}
			<div
				className={`dce-${widgetType}`}
				id={uuid}
				iframe="true"
				data-wt={template}
				slug={widgetSlug}
			></div>
		</div>
	);
};

export default WidgetPreview;
