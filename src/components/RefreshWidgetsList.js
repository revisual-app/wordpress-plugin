/**
 * Refresh control — design-system secondary button rather than a WP <Button>,
 * which renders WP blue with a 2px radius and its own focus ring.
 * Goes to src/components/RefreshWidgetsList.js (replace).
 */

import React from "react";
import { useCallback } from "@wordpress/element";
import { useWidgetsStore } from "../hooks/useWidgets";
import { RefreshCcw01 } from "../icons";

/**
 * @param {boolean} showLabel
 * @returns {Element}
 * @constructor
 */
const RefreshWidgetsList = ({ showLabel = false }) => {
  const { widgets, fetchWidgets } = useWidgetsStore();

  const onClick = useCallback(() => fetchWidgets(), [fetchWidgets]);

  return (
    <button
      type={"button"}
      className={`rev--btn rev--btn_secondary${showLabel ? "" : " rev--btn_icon"}`}
      onClick={onClick}
      disabled={widgets.fetch}
      title={"Refresh calendars list"}
      aria-label={showLabel ? undefined : "Refresh calendars list"}
    >
      <RefreshCcw01 size={16} />
      {showLabel ? "Refresh" : null}
    </button>
  );
};

export default RefreshWidgetsList;
