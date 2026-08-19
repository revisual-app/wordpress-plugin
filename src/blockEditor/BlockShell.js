/**
 * Shared shell for every state the block can be in: the same white card,
 * the same header row, the same 4px radius. Only the body changes.
 *
 * New file — src/blockEditor/BlockShell.js. CanvasPlaceholder,
 * NoWidgetsPlaceholder and SetupMissingPlaceholder all render through it, so
 * the block never changes shape when the state does.
 */

import React from "react";
import { __ } from "@wordpress/i18n";
import AppIcon from "../adminPanel/components/AppIcon";
import { WidgetsNames } from "../consts";

const BlockShell = ({ widgetType = "calendar", hint, actions, children }) => {
  const singular = (
    WidgetsNames[widgetType]?.singular || "widget"
  ).toLowerCase();

  return (
    <div className={"rev-blk"}>
      <div className={"rev-blk-header"}>
        <div className={"rev-blk-title"}>
          <AppIcon width={"20"} />
          <span className={"rev-blk-title-name"}>
            {__("Revisual", "revisual")} {singular}
          </span>
          {hint ? <span className={"rev-blk-title-hint"}>— {hint}</span> : null}
        </div>
        {actions ? (
          <div className={"rev-blk-header-actions"}>{actions}</div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export default BlockShell;
