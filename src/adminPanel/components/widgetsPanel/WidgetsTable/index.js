/**
 * Calendars table — toolbar, sortable header, rows, pagination, states.
 *
 * Structural changes from the previous WidgetsTable:
 * - availability is a segmented filter here instead of an outer <TabPanel>
 * - the shortcode is visible in the row, not hidden behind a "Copy shortcode" button
 * - Integration folded into the Status cell (a badge), so the row fits without scroll
 * - results are paginated client-side; the whole collection is already in the store
 */

import React from "react";
import { useCallback, useEffect, useMemo, useState } from "@wordpress/element";
import { useWidgetsStore } from "../../../../hooks/useWidgets";
import { AvailableTemplates } from "../../../../consts";
import Toolbar from "./Toolbar";
import Row from "./Row";
import Pagination from "./Pagination";
import { LoadingRows, EmptyState, NoResultsState, ErrorState } from "./States";

const PAGE_SIZE = 10;

// The block editor's picker imports this to count unavailable widgets.
export const widgetsFilter = (widget) =>
	widget.available === 1 && !!widget.integration;

export const Availability = {
	all: { name: "all", title: "All", filter: () => true },
	published: {
		name: "published",
		title: "Published",
		filter: widgetsFilter,
	},
	unavailable: {
		name: "unavailable",
		title: "Unavailable",
		filter: (w) => w.available === 0 || !w.integration,
	},
};

const Columns = [
	{
		name: "Name",
		className: "rev--col-name",
		sort: (order) => (a, b) =>
			order === "asc"
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name),
	},
	{ name: "Template", className: "rev--col-template" },
	{ name: "Shortcode", className: "rev--col-shortcode" },
	{
		name: "Last updated",
		className: "rev--col-updated",
		sort: (order) => (a, b) =>
			order === "asc" ? a.modified - b.modified : b.modified - a.modified,
	},
	{ name: "", className: "rev--col-actions", label: "Actions", hideLabel: true },
];

const SortOrders = ["asc", "desc"];

/**
 * @param {string} widgetType
 * @param {function=} onSelect  when given, the table becomes a picker: published
 *                              only, no availability filter, Insert instead of
 *                              the shortcode cell (block editor placeholder)
 * @returns {Element}
 * @constructor
 */
const WidgetsTable = ({ widgetType = "calendar", onSelect }) => {
	const { widgets, fetchWidgets } = useWidgetsStore();

	const picker = typeof onSelect === "function";
	const [availability, setAvailability] = useState(
		picker ? Availability.published.name : Availability.all.name
	);
	const [template, setTemplate] = useState("");
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState({ field: "Last updated", order: "desc" });
	const [page, setPage] = useState(1);

	const templateOptions = useMemo(() => {
		const options = (AvailableTemplates[widgetType] || []).map((i) => ({
			label: i.label,
			value: i.template,
		}));
		options.unshift({ label: "All templates", value: "" });
		return options;
	}, [widgetType]);

	const ofType = useMemo(
		() => (widgets.collection || []).filter((i) => i.widget_type === widgetType),
		[widgets.collection, widgetType]
	);

	// Counts stay on the unfiltered-by-availability set so the segmented control
	// reads as a summary of the whole list, not of the current filter.
	const counts = useMemo(() => {
		const searched = ofType
			.filter((i) => (template ? i.template === template : true))
			.filter((i) =>
				query ? i.name.toLowerCase().includes(query.toLowerCase()) : true
			);
		return {
			all: searched.length,
			published: searched.filter(Availability.published.filter).length,
			unavailable: searched.filter(Availability.unavailable.filter).length,
		};
	}, [ofType, template, query]);

	const rows = useMemo(() => {
		const sortColumn = Columns.find((c) => c.name === sort.field);
		return ofType
			.filter(Availability[availability].filter)
			.filter((i) => (template ? i.template === template : true))
			.filter((i) =>
				query ? i.name.toLowerCase().includes(query.toLowerCase()) : true
			)
			.sort(sortColumn && sortColumn.sort ? sortColumn.sort(sort.order) : undefined);
	}, [ofType, availability, template, query, sort]);

	const columns = useMemo(
		() =>
			picker
				? Columns.filter((c) => c.name !== "Shortcode").map((c) =>
						c.className === "rev--col-actions"
							? { ...c, label: "Insert", className: "rev--col-insert" }
							: c
				  )
				: Columns,
		[picker]
	);

	const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);
	const pageRows = rows.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE
	);

	// Any filter change puts you back on page one.
	useEffect(() => setPage(1), [availability, template, query, widgetType]);

	const onSort = useCallback(
		(field) => () =>
			setSort((prev) => ({
				field,
				order:
					prev.field !== field
						? "asc"
						: SortOrders[(SortOrders.indexOf(prev.order) + 1) % SortOrders.length],
			})),
		[]
	);

	const onClearFilters = useCallback(() => {
		setQuery("");
		setTemplate("");
		setAvailability(Availability.all.name);
	}, []);

	const filtering = !!query || !!template || availability !== Availability.all.name;

	if (widgets.fetchError) {
		return (
			<ErrorState error={widgets.fetchError} onRetry={fetchWidgets} />
		);
	}

	// Nothing at all in the account — the toolbar would have nothing to filter.
	if (widgets.fetchSuccess && !ofType.length) {
		return <EmptyState widgetType={widgetType} onRefresh={fetchWidgets} />;
	}

	const loading = widgets.fetch;

	return (
		<div className={"rev--table-card"}>
			<Toolbar
				query={query}
				onQueryChange={setQuery}
				template={template}
				templateOptions={templateOptions}
				onTemplateChange={setTemplate}
				availability={availability}
				onAvailabilityChange={setAvailability}
				counts={counts}
				total={rows.length}
				loading={loading}
				showAvailability={!picker}
			/>

			<div className={"rev--table-scroll"}>
				<table className={"rev--table"}>
					<thead>
						<tr>
							{columns.map((column) => (
								<th key={column.name || "actions"} className={column.className}>
									{column.sort ? (
										<button
											type={"button"}
											className={`rev--th-sort${
												sort.field === column.name ? " is-sorted" : ""
											}`}
											onClick={onSort(column.name)}
											aria-label={`Sort by ${column.name}`}
										>
											{column.name}
											<i
												className={`rev--sort-caret rev--sort-caret_${
													sort.field === column.name ? sort.order : "none"
												}`}
												aria-hidden={true}
											/>
										</button>
									) : column.hideLabel ? (
										<span className={"screen-reader-text"}>{column.label}</span>
									) : (
										column.name
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<LoadingRows columns={columns.length} />
						) : pageRows.length ? (
							pageRows.map((row) => (
								<Row key={row.uuid} row={row} onSelect={onSelect} />
							))
						) : (
							<NoResultsState
								columns={columns.length}
								onClearFilters={onClearFilters}
								filtering={filtering}
							/>
						)}
					</tbody>
				</table>
			</div>

			{!loading && pageCount > 1 ? (
				<Pagination
					page={currentPage}
					pageCount={pageCount}
					onChange={setPage}
				/>
			) : null}
		</div>
	);
};

export default WidgetsTable;
