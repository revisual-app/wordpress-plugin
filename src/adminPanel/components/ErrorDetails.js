/**
 * Technical error details, collapsed by default.
 *
 * The old ErrorMessage buried the backend response in a @wordpress/components
 * <Panel> that looked nothing like the rest of the screen. Same information,
 * same "closed until asked for" behaviour — plus a one-click copy, because the
 * only reason anyone opens this is to paste it to support.
 *
 * Reads the shapes the API layer actually produces:
 *   error.message                      — axios/network message
 *   error.response.data.message        — API error body
 *   error.data.error.{message,file,line} — PHP side
 *   error.code                         — HTTP status
 */

import React from "react";
import { useCallback, useMemo, useState } from "@wordpress/element";
import appConfig from "../../config/appConfig";
import { ChevronDown, Copy01 } from "../../icons";

export const readErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.data?.error?.message) {
    return error.data.error.message;
  }
  if (error?.message) {
    return error.message;
  }
  return "Something went wrong!";
};

/**
 * Whole error object as pretty JSON. Error instances hide message/stack behind
 * non-enumerable props and axios errors self-reference through `config`, so
 * neither survives a plain JSON.stringify — both are handled here.
 *
 * @param {*} value
 * @returns {string}
 */
export const dumpError = (value) => {
  const seen = new WeakSet();

  try {
    return JSON.stringify(
      value,
      (key, val) => {
        if (val instanceof Error) {
          return {
            name: val.name,
            message: val.message,
            stack: val.stack,
            ...val,
          };
        }
        if (typeof val === "function") {
          return undefined;
        }
        if (val && typeof val === "object") {
          if (seen.has(val)) {
            return "[circular]";
          }
          seen.add(val);
        }
        return val;
      },
      2,
    );
  } catch (e) {
    return String(value);
  }
};

const ErrorDetails = ({ error, action }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => {
    const file = error?.data?.error?.file;
    const line = error?.data?.error?.line;

    return [
      action ? ["Action", action] : null,
      ["Message", readErrorMessage(error)],
      error?.code ? ["Status", String(error.code)] : null,
      file ? ["File", line ? `${file}:${line}` : file] : null,
      ["Site", window.location.origin],
      ["Time", new Date().toISOString()],
    ].filter(Boolean);
  }, [error, action]);

  const dump = useMemo(() => dumpError(error), [error]);

  const report = useMemo(
    () =>
      [`${appConfig.appName} for WordPress — error report`]
        .concat(rows.map(([label, value]) => `${label}: ${value}`))
        .concat(["", "Full response:", dump])
        .join("\n"),
    [rows, dump],
  );

  const onCopy = useCallback(() => {
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(report).then(done, done);
      return;
    }
    // Older admin browsers / non-secure contexts.
    const field = document.createElement("textarea");
    field.value = report;
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    document.body.removeChild(field);
    done();
  }, [report]);

  if (!error) {
    return null;
  }

  return (
    <div className={"rev--details"}>
      <button
        type={"button"}
        className={"rev--details-summary"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown
          size={16}
          className={`rev--details-caret${
            open ? " rev--details-caret_open" : ""
          }`}
        />
        {open ? "Hide error details" : "Show error details"}
      </button>

      {open ? (
        <div className={"rev--details-body"}>
          <dl className={"rev--details-list"}>
            {rows.map(([label, value]) => (
              <div className={"rev--details-row"} key={label}>
                <dt className={"rev--details-label"}>{label}</dt>
                <dd className={"rev--details-value"}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={"rev--details-row"}>
            <span className={"rev--details-label"}>Full response</span>
            <pre className={"rev--details-dump"}>{dump}</pre>
          </div>

          <div className={"rev--details-actions"}>
            <button
              type={"button"}
              className={"rev--btn rev--btn_secondary rev--btn_sm"}
              onClick={onCopy}
            >
              <Copy01 size={16} />
              {copied ? "Copied" : "Copy for support"}
            </button>
            <a
              className={"rev--details-link"}
              href={appConfig.helpdeskUrl}
              target={"support"}
            >
              Contact support
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorDetails;
