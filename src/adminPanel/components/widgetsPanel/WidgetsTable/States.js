/**
 * Loading, empty, no-results and error states for the calendars table.
 * Loading renders skeleton rows inside the live table so the toolbar, header
 * and column widths stay put — no full-page spinner swap.
 */

import React from "react";
import AddNewButton from "../../../../components/AddNewButton";
import { CalendarCheck01, AlertCircle, RefreshCcw01 } from "../../../../icons";
import { WidgetsNames } from "../../../../consts";
import appConfig from "../../../../config/appConfig";

const SKELETON_WIDTHS = [
	["70%", "80%", "92%", "60%"],
	["55%", "65%", "88%", "72%"],
	["64%", "72%", "84%", "58%"],
	["48%", "60%", "90%", "66%"],
	["60%", "70%", "86%", "62%"],
];

export const LoadingRows = ({ columns }) => (
	<>
		{SKELETON_WIDTHS.map((widths, i) => (
			<tr
				key={`skeleton-${i}`}
				className={"rev--skeleton-row"}
				style={{ animationDelay: `${i * 0.12}s` }}
				aria-hidden={true}
			>
				{Array.from({ length: columns }, (_, c) => (
					<td key={c}>
						{c < widths.length ? (
							<span className={"rev--skeleton"} style={{ width: widths[c] }} />
						) : null}
					</td>
				))}
			</tr>
		))}
		<tr className={"screen-reader-text"}>
			<td colSpan={columns}>Loading calendars</td>
		</tr>
	</>
);

export const NoResultsState = ({ columns, filtering, onClearFilters }) => (
	<tr>
		<td colSpan={columns}>
			<div className={"rev--state rev--state_inline"}>
				<h3 className={"rev--state-title"}>No calendars found</h3>
				<p className={"rev--state-text"}>
					{filtering
						? "No calendar matches these filters. Try a different search or template."
						: "There is nothing to show here yet."}
				</p>
				{filtering ? (
					<button
						type={"button"}
						className={"rev--btn rev--btn_secondary"}
						onClick={onClearFilters}
					>
						Clear filters
					</button>
				) : null}
			</div>
		</td>
	</tr>
);

export const EmptyState = ({ widgetType, onRefresh }) => (
	<div className={"rev--table-card"}>
		<div className={"rev--state"}>
			<span className={"rev--state-icon"}>
				<CalendarCheck01 size={24} />
			</span>
			<h3 className={"rev--state-title"}>
				No {WidgetsNames[widgetType].title.toLowerCase()} yet
			</h3>
			<p className={"rev--state-text"}>
				Build your first {WidgetsNames[widgetType].singular.toLowerCase()} in{" "}
				{appConfig.appName}, then come back here to copy its shortcode.
			</p>
			<div className={"rev--state-actions"}>
				<button
					type={"button"}
					className={"rev--btn rev--btn_secondary"}
					onClick={onRefresh}
				>
					<RefreshCcw01 size={16} />
					Refresh list
				</button>
				<AddNewButton widgetType={widgetType} />
			</div>
		</div>
	</div>
);

export const ErrorState = ({ error, onRetry }) => (
	<div className={"rev--table-card"}>
		<div className={"rev--state"}>
			<span className={"rev--state-icon rev--state-icon_error"}>
				<AlertCircle size={24} />
			</span>
			<h3 className={"rev--state-title"}>
				We could not load your calendars
			</h3>
			<p className={"rev--state-text"}>
				{error?.message ||
					`Calendars already on your site keep working. ${appConfig.appName} did not answer this request.`}
			</p>
			<div className={"rev--state-actions"}>
				<button
					type={"button"}
					className={"rev--btn rev--btn_secondary"}
					onClick={onRetry}
				>
					<RefreshCcw01 size={16} />
					Try again
				</button>
			</div>
		</div>
	</div>
);
