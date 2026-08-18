/**
 * Connection error — Revisual answered with something other than 401, or did not
 * answer at all (network down, DNS, 5xx, timeout).
 *
 * Deliberately NOT the same screen as ApiKeyError: nothing is wrong with this
 * site's credentials, so the way out is to retry rather than to log in again.
 * The key screen sends people to the login flow; this one must not, or they'll
 * churn through an auth round-trip that can't fix an unreachable API.
 */

import React from "react";
import { useCallback } from "@wordpress/element";
import { useOrgInfoStore } from "../../hooks/useOrgInfo";
import appConfig from "../../config/appConfig";
import ErrorDetails from "./ErrorDetails";
import { AlertCircle, RefreshCcw01, ArrowUpRight } from "../../icons";

const ApiStatus = ({ code }) => {
  if (!code) {
    return null;
  }
  return (
    <p className={"rev--state-note"}>
      {appConfig.appName} responded with error {code}.
    </p>
  );
};

const ConnectionError = () => {
  const { orgInfo, fetchOrgInfo } = useOrgInfoStore();

  const retrying = Boolean(orgInfo.fetch);
  const code = orgInfo.fetchError?.code;

  const onRetry = useCallback(() => fetchOrgInfo(), [fetchOrgInfo]);

  return (
    <div className={"rev--card"}>
      <div className={"rev--state"} role={"alert"}>
        <span className={"rev--state-icon rev--state-icon_warning"}>
          <AlertCircle size={24} />
        </span>

        <h2 className={"rev--state-title"}>
          We can&rsquo;t reach {appConfig.appName} right now
        </h2>
        <p className={"rev--state-text"}>
          Your account is still connected — this site just couldn&rsquo;t get an
          answer from {appConfig.appName}. Calendars already placed on your
          pages keep working; try again in a moment.
        </p>

        <div className={"rev--state-actions"}>
          <button
            type={"button"}
            className={"rev--btn rev--btn_primary"}
            onClick={onRetry}
            disabled={retrying}
          >
            <RefreshCcw01
              size={16}
              className={retrying ? "rev--spin" : undefined}
            />
            {retrying ? "Trying again…" : "Try again"}
          </button>
          <a
            className={"rev--btn rev--btn_secondary"}
            href={appConfig.appUrl}
            target={"_revisual"}
          >
            Open {appConfig.appName}
            <ArrowUpRight size={16} />
          </a>
        </div>

        <ApiStatus code={code} />

        <ErrorDetails
          error={orgInfo.fetchError}
          action={`Reading your ${appConfig.appName} settings`}
        />
      </div>
    </div>
  );
};

export default ConnectionError;
