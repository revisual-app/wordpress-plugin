/**
 * Nothing to embed yet — the account is connected but has no published widget
 * of this type. Replaces src/blockEditor/NoWidgetsPlaceholder/index.js, which
 * printed "You have no calendar widgets..." next to a button.
 *
 * Two ways out, in order: make one, or refresh after publishing one elsewhere.
 */

import React from "react";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";
import AddNewButton from "../../components/AddNewButton";
import BlockShell from "../BlockShell";
import { WidgetsNames } from "../../consts";
import { CalendarCheck01 } from "../../icons";

const NoWidgetsPlaceholder = ({ widgetType = "calendar" }) => {
  const plural = (WidgetsNames[widgetType]?.title || "widgets").toLowerCase();
  const singular = (
    WidgetsNames[widgetType]?.singular || "widget"
  ).toLowerCase();

  return (
    <BlockShell
      widgetType={widgetType}
      hint={"nothing to embed yet"}
      actions={<RefreshWidgetsList />}
    >
      <div className={"rev-blk-state"}>
        <span className={"rev-blk-state-icon"}>
          <CalendarCheck01 size={20} />
        </span>
        <span className={"rev-blk-state-title"}>No published {plural} yet</span>
        <span className={"rev-blk-state-text"}>
          Create a {singular} in Revisual and set its status to published — it
          shows up here as soon as you refresh.
        </span>
        <span className={"rev-blk-state-actions"}>
          <AddNewButton widgetType={widgetType} />
        </span>
      </div>
    </BlockShell>
  );
};

export default NoWidgetsPlaceholder;
