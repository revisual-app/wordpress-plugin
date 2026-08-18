/**
 * ErrorMessage — the generic "a request failed" card, used by MainPage (WP
 * settings, org info) and by the calendars table.
 *
 * Replaces src/components/ErrorMessage.js, which rendered a @wordpress/components
 * Card + Panel pair that matched nothing else on the screen. Same inputs, same
 * behaviour (details collapsed by default), now on the plugin's own card style
 * with a copyable report for support.
 *
 * Always offers a way forward: `onRetry` when the caller can re-run the request
 * (MainPage passes fetchWpSettings), and a page reload otherwise — a failed WP
 * settings read leaves the admin screen with nothing else on it, so a dead-end
 * card would strand the user.
 *
 * Paths are written for src/components/ — ErrorDetails ships from
 * implementation/connected/ into src/adminPanel/components/.
 */

import React from "react";
import ErrorDetails, {
  readErrorMessage,
} from "../adminPanel/components/ErrorDetails";
import { AlertCircle, RefreshCcw01 } from "../icons";

const ErrorMessage = ({ error, action, onRetry, retrying = false }) => {
  const message = readErrorMessage(error);
  const isMarkup = typeof message === "string" && message.includes("</");

  return (
    <div className={"rev--card rev--card_error"} role={"alert"}>
      <div className={"rev--notice"}>
        <span className={"rev--state-icon rev--state-icon_error"}>
          <AlertCircle size={20} />
        </span>

        <div className={"rev--notice-body"}>
          <h3 className={"rev--notice-title"}>
            A problem occurred while {action}.
          </h3>

          {isMarkup ? (
            <div
              className={"rev--notice-text"}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          ) : (
            <p className={"rev--notice-text"}>{message}</p>
          )}

          <div className={"rev--notice-actions"}>
            {onRetry ? (
              <button
                type={"button"}
                className={"rev--btn rev--btn_primary rev--btn_sm"}
                onClick={onRetry}
                disabled={retrying}
              >
                <RefreshCcw01
                  size={16}
                  className={retrying ? "rev--spin" : undefined}
                />
                {retrying ? "Trying again…" : "Try again"}
              </button>
            ) : null}
            <button
              type={"button"}
              className={"rev--btn rev--btn_secondary rev--btn_sm"}
              onClick={() => window.location.reload()}
            >
              Reload the page
            </button>
          </div>

          <ErrorDetails error={error} action={action} />
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
