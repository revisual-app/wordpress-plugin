/**
 * WidgetPreview — the embedded widget as it renders in the canvas.
 *
 * Replaces src/blockEditor/WidgetPreview.js. One behavioural change: the
 * preview is an iframe, so every click landed inside the embed and the block
 * itself never got selected — you had to hit the thin margin around it or use
 * the list view.
 *
 * Same fix core uses for the Embed block: a transparent overlay covers the
 * preview while the block is NOT selected, so the first click selects the block
 * (WP handles that once the click lands on block markup). Once selected the
 * overlay is removed and the embed is interactive again — scrolling a month,
 * opening an event — so a second click behaves as it always did.
 */

import React from "react";
import { useEffect, useRef } from "@wordpress/element";
import { attachScript, postMessageToContentWindow } from "../utils";
import appConfig from "../config/appConfig";

const WidgetPreview = ({
  widgetType,
  uuid,
  template,
  widgetSlug,
  isSelected = false,
}) => {
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
        document.querySelector(".editor-canvas__iframe")?.contentWindow
          ?.document?.head ||
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
      <div
        className={`dce-${widgetType}`}
        id={uuid}
        iframe="true"
        data-wt={template}
        slug={widgetSlug}
      ></div>

      {isSelected ? null : (
        <div className={"rev-widget-preview-overlay"} aria-hidden={"true"} />
      )}
    </div>
  );
};

export default WidgetPreview;
