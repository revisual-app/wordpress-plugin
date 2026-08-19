/**
 * Dashboard loading state.
 *
 * Replaces the bare <Spinner /> the panel used to render while orgInfo and the
 * widgets collection are in flight. It mirrors the real dashboard's layout
 * one-for-one — page header, three stat cards, prompt card — so the screen does
 * not reflow when data lands, and the brand-coloured indeterminate bar carries
 * the "something is happening" signal the spinner used to.
 *
 * Static markup only: no props, no state, nothing to wire up.
 */

import React from "react";

const Bar = ({ width, height = 10 }) => (
  <span className={"rev--skeleton"} style={{ width, height }} />
);

const DashboardSkeleton = () => (
  <div className={"rev--loading"} role={"status"} aria-busy={"true"}>
    <span className={"rev--loading-bar"} aria-hidden={"true"} />
    <span className={"screen-reader-text"}>Loading your dashboard…</span>

    <div className={"rev--page-header"} aria-hidden={"true"}>
      <div className={"rev--page-header-text"}>
        <Bar width={280} height={22} />
        <Bar width={360} />
      </div>
      <div className={"rev--page-header-actions"}>
        <span
          className={"rev--skeleton rev--skeleton_btn"}
          style={{ width: 104 }}
        />
        <span
          className={"rev--skeleton rev--skeleton_btn"}
          style={{ width: 148 }}
        />
      </div>
    </div>

    <div className={"rev--stats"} aria-hidden={"true"}>
      {["Calendars", "Published", "Unavailable"].map((label) => (
        <div className={"rev--stat"} key={label}>
          <Bar width={84} />
          <Bar width={56} height={26} />
        </div>
      ))}
    </div>

    <div className={"rev--card rev--card_prompt"} aria-hidden={"true"}>
      <div className={"rev--skeleton-stack"}>
        <Bar width={240} height={16} />
        <Bar width={420} />
        <Bar width={300} />
      </div>
      <div className={"rev--card-actions"}>
        <span
          className={"rev--skeleton rev--skeleton_btn"}
          style={{ width: 132 }}
        />
        <span
          className={"rev--skeleton rev--skeleton_btn"}
          style={{ width: 156 }}
        />
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
