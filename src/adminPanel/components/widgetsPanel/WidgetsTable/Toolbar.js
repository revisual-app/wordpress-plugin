/**
 * Table toolbar — search, template filter, availability segmented control.
 * Stays mounted while the list loads so the filters never disappear under you.
 */

import React from "react";
import { Spinner } from "@wordpress/components";
import { SearchLg, ChevronDown, XClose } from "../../../../icons";

const Segments = ["all", "published", "unavailable"];
const SegmentLabels = {
	all: "All",
	published: "Published",
	unavailable: "Unavailable",
};

const Toolbar = ({
	query,
	onQueryChange,
	template,
	templateOptions,
	onTemplateChange,
	availability,
	onAvailabilityChange,
	counts,
	total,
	loading,
	showAvailability = true,
}) => (
	<div className={"rev--toolbar"}>
		<div className={"rev--search"}>
			<SearchLg size={16} className={"rev--search-icon"} />
			<input
				type={"search"}
				className={"rev--search-input"}
				placeholder={"Search calendars"}
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
				aria-label={"Search calendars by name"}
			/>
			{query ? (
				<button
					type={"button"}
					className={"rev--search-clear"}
					onClick={() => onQueryChange("")}
					aria-label={"Clear search"}
				>
					<XClose size={14} />
				</button>
			) : null}
		</div>

		<div className={"rev--select"}>
			<select
				className={"rev--select-input"}
				value={template}
				onChange={(e) => onTemplateChange(e.target.value)}
				aria-label={"Filter by template"}
			>
				{templateOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown size={16} className={"rev--select-caret"} />
		</div>

		{showAvailability ? (
			<div className={"rev--segmented"} role={"group"} aria-label={"Availability"}>
				{Segments.map((segment) => (
					<button
						key={segment}
						type={"button"}
						className={`rev--segment${
							availability === segment ? " is-active" : ""
						}`}
						aria-pressed={availability === segment}
						onClick={() => onAvailabilityChange(segment)}
					>
						{SegmentLabels[segment]}
						<span className={"rev--segment-count"}>{counts[segment]}</span>
					</button>
				))}
			</div>
		) : null}

		<div className={"rev--toolbar-meta"}>
			{loading ? (
				<>
					<Spinner />
					Loading calendars
				</>
			) : (
				`${total} ${total === 1 ? "calendar" : "calendars"}`
			)}
		</div>
	</div>
);

export default Toolbar;
