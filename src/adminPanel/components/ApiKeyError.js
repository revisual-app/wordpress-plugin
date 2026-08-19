/**
 * API key error — shown when the Revisual API rejects this site's key (401).
 *
 * The old version was a bare notice string. This is a recovery screen: it says
 * what broke, what it means for the site, and puts the one action that fixes it
 * (log in again, which reissues the key) in front of the user. Disconnecting is
 * offered as the quieter secondary path.
 */

import React from "react";
import { useCallback } from "@wordpress/element";
import { Spinner } from "@wordpress/components";
import { useSettingsAppStore } from "../../hooks/useSettingsApp";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import { useOrgInfoStore } from "../../hooks/useOrgInfo";
import appConfig from "../../config/appConfig";
import ErrorDetails from "./ErrorDetails";
import { Key01 } from "../../icons";

const ApiKeyError = () => {
  const { disconnectPlugin } = useSettingsAppStore();
  const { wpSettings } = useWPSettingsStore();
  const { orgInfo } = useOrgInfoStore();

  const disconnecting = Boolean(wpSettings.revokeTokenUrlFetch);

  const onReconnect = useCallback(
    (e) => {
      e.preventDefault();
      window.location = wpSettings.model.authUrl;
    },
    [wpSettings.model],
  );

  const onDisconnect = useCallback((e) => {
    e.preventDefault();
    disconnectPlugin();
  }, []);

  return (
    <div className={"rev--card"}>
      <div className={"rev--state"} role={"alert"}>
        <span className={"rev--state-icon rev--state-icon_error"}>
          <Key01 size={24} />
        </span>

        <h2 className={"rev--state-title"}>
          This site&rsquo;s {appConfig.appName} key is no longer valid
        </h2>
        <p className={"rev--state-text"}>
          {appConfig.appName} rejected the key stored on this site, so we
          can&rsquo;t load your calendars here. It usually means the key was
          revoked or the account it belonged to changed.
        </p>

        <div className={"rev--state-actions"}>
          <a
            className={"rev--btn rev--btn_primary"}
            href={wpSettings.model?.authUrl || "#"}
            onClick={onReconnect}
          >
            Log in to reconnect
          </a>
          <a
            className={"rev--btn rev--btn_secondary"}
            href={"#disconnect"}
            rel={"nofollow"}
            onClick={onDisconnect}
            aria-disabled={disconnecting}
          >
            {disconnecting ? <Spinner /> : null}
            {disconnecting ? "Disconnecting…" : "Disconnect this site"}
          </a>
        </div>

        <p className={"rev--state-note"}>
          Reconnecting keeps your calendars and shortcodes as they are.
        </p>

        <ErrorDetails
          error={orgInfo.fetchError}
          action={`Reading your ${appConfig.appName} settings`}
        />
      </div>
    </div>
  );
};

export default ApiKeyError;
