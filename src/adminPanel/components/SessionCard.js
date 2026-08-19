/**
 * Session card — org avatar, name, connection status, actions menu.
 * Replaces SessionPanel / InfoBlock / Action, which rendered the same three
 * states as a heading + subtitle + coloured text link.
 */

import React from "react";
import { useCallback, useEffect, useState } from "@wordpress/element";
import { Spinner } from "@wordpress/components";
import { useSettingsAppStore } from "../../hooks/useSettingsApp";
import { useOrgInfoStore } from "../../hooks/useOrgInfo";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import appConfig from "../../config/appConfig";
import { ChevronDown, ArrowUpRight, LogOut01 } from "../../icons";

/**
 * @param {string} name
 * @returns {string} up to two uppercase initials
 */
const initialsOf = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "R";

const SessionCard = () => {
  const { disconnectPlugin } = useSettingsAppStore();
  const { orgInfo } = useOrgInfoStore();
  const { wpSettings } = useWPSettingsStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (wpSettings.revokeTokenUrl) {
      window.location = wpSettings.revokeTokenUrl;
    }
  }, [wpSettings.revokeTokenUrl]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onDocumentClick = (e) => {
      if (!e.target.closest(".rev--session")) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onDisconnect = useCallback((e) => {
    e.preventDefault();
    setOpen(false);
    disconnectPlugin();
  }, []);

  const onReConnect = useCallback(
    (e) => {
      e.preventDefault();
      window.location = wpSettings.model.authUrl;
    },
    [wpSettings.model],
  );

  // Not connected — the card becomes the recovery action itself. Three distinct
  // causes, three different ways out: no key stored (log in), key rejected
  // (log in again), API unreachable (nothing to authorise — the main panel owns
  // the retry, so the card only reports).
  if (orgInfo.fetchError) {
    const needsLogin =
      !wpSettings.model ||
      !wpSettings.model?.apiKey ||
      wpSettings.model?.apiKey === "undefined";
    const keyRejected = orgInfo.fetchError.code === 401;
    const unreachable = !needsLogin && !keyRejected;

    let name = `${appConfig.appName} not connected`;
    let status = "Key rejected";

    if (needsLogin) {
      name = `${appConfig.appName} not configured`;
      status = "No account linked";
    } else if (unreachable) {
      name = `${appConfig.appName} unreachable`;
      status = "Connection lost";
    }

    return (
      <div
        className={`rev--session rev--session_error${
          unreachable ? " rev--session_warning" : ""
        }`}
      >
        <div className={"rev--session-body"}>
          <span className={"rev--session-name"}>{name}</span>
          <span
            className={`rev--session-status rev--session-status_${
              unreachable ? "warning" : "error"
            }`}
          >
            <i
              className={`rev--dot rev--dot_${
                unreachable ? "warning" : "error"
              }`}
            />
            {status}
          </span>
        </div>
        {unreachable ? null : (
          <a
            href={wpSettings.model?.authUrl || "#"}
            className={"rev--btn rev--btn_primary rev--btn_sm"}
            onClick={onReConnect}
          >
            {needsLogin ? "Log in" : "Reconnect"}
          </a>
        )}
      </div>
    );
  }

  // Still pulling account information.
  if (!orgInfo.fetchSuccess) {
    return (
      <div className={"rev--session rev--session_loading"}>
        <Spinner />
        <div className={"rev--session-body"}>
          <span className={"rev--session-name"}>
            {appConfig.appName} is loading
          </span>
          <span className={"rev--session-status"}>
            Pulling your account information
          </span>
        </div>
      </div>
    );
  }

  const orgName = orgInfo.model.name;

  return (
    <div className={"rev--session"}>
      <button
        type={"button"}
        className={"rev--session-trigger"}
        aria-expanded={open}
        aria-haspopup={"menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={"rev--session-avatar"} aria-hidden={true}>
          {initialsOf(orgName)}
        </span>
        <span className={"rev--session-body"}>
          <span className={"rev--session-name"}>{orgName}</span>
          <span className={"rev--session-status"}>
            <i className={"rev--dot rev--dot_success"} />
            Connected
          </span>
        </span>
        {wpSettings.revokeTokenUrlFetch ? (
          <Spinner />
        ) : (
          <ChevronDown size={18} className={"rev--session-caret"} />
        )}
      </button>

      {open ? (
        <div className={"rev--menu rev--menu_end"} role={"menu"}>
          <a
            className={"rev--menu-item"}
            role={"menuitem"}
            href={appConfig.appUrl}
            target={"_revisual"}
            onClick={() => setOpen(false)}
          >
            <ArrowUpRight size={16} />
            Open {appConfig.appName}
          </a>
          <a
            className={"rev--menu-item rev--menu-item_danger"}
            role={"menuitem"}
            href={"#disconnect"}
            rel={"nofollow"}
            onClick={onDisconnect}
          >
            <LogOut01 size={16} />
            Disconnect
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default SessionCard;
