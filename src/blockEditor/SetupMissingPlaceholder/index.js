/**
 * Setup missing — no API key on the site, so the block can't list anything.
 * Replaces src/blockEditor/SetupMissingPlaceholder/index.js (an ⚠️ emoji in an
 * <h3> next to a WP button; the design system uses no emoji).
 *
 * The fix lives on another screen, so the action is a plain link out to the
 * plugin's settings page — opened in its own tab, since the post is unsaved.
 */

import React from "react";
import BlockShell from "../BlockShell";
import appConfig from "../../config/appConfig";
import { Key01, ArrowUpRight } from "../../icons";

const SETTINGS_URL = "/wp-admin/admin.php?page=revisual";

const SetupMissingPlaceholder = ({ widgetType = "calendar" }) => (
  <BlockShell widgetType={widgetType} hint={"not connected"}>
    <div className={"rev-blk-state"}>
      <span className={"rev-blk-state-icon rev-blk-state-icon_warning"}>
        <Key01 size={20} />
      </span>
      <span className={"rev-blk-state-title"}>
        Connect {appConfig.appName} to embed a calendar
      </span>
      <span className={"rev-blk-state-text"}>
        This site isn&rsquo;t linked to a {appConfig.appName} account yet. Link
        it once and every calendar you publish becomes available to this block.
      </span>
      <span className={"rev-blk-state-actions"}>
        <a
          className={"rev--btn rev--btn_primary"}
          href={SETTINGS_URL}
          target={"_RevisualSettings"}
        >
          Open {appConfig.appName} settings
          <ArrowUpRight size={14} />
        </a>
      </span>
    </div>
  </BlockShell>
);

export default SetupMissingPlaceholder;
