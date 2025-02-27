/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/07/2024
 */

import React from "react";
import {
	Button,
	IconButton,
	SelectControl,
	TextControl,
} from "@wordpress/components";
import { useCallback, useMemo, useState } from "@wordpress/element";
import { AvailableTemplates } from "../../../../consts";
import { useWidgetsStore } from "../../../../hooks/useWidgets";
import Name from "./columns/Name";
import Template from "./columns/Template";
import LastUpdated from "./columns/LastUpdated";
import Integration from "./columns/Integration";
import Actions from "./columns/Actions";
import Status from "./columns/Status";
import ActionsCanvas from "./columns/ActionsCanvas";
import AddNewButton from "../../../../components/AddNewButton";
import InitialLoading from "../../InitialLoading";
import ErrorMessage from "../../../../components/ErrorMessage";

const Columns = [
	{
		name: "Name",
		component: Name,
		sort: (order) => (a, b) =>
			order === "asc"
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name),
	},
	{
		name: "Status",
		component: Status,
		width: "35%",
	},
	{
		name: "Template",
		width: "120",
		component: Template,
		sort: (order) => (a, b) => {
			const aName = AvailableTemplates[a.widget_type].find(
				(i) => i.template === a.template
			).label;
			const bName = AvailableTemplates[b.widget_type].find(
				(i) => i.template === b.template
			).label;

			return order === "asc"
				? aName.localeCompare(bName)
				: bName.localeCompare(aName);
		},
	},
	{
		name: "Integration",
		width: "110",
		component: Integration,
	},
	{
		name: "Last updated",
		width: "160",
		component: LastUpdated,
		sort: (order) => (a, b) =>
			order === "asc" ? a.modified - b.modified : b.modified - a.modified,
	},
	{
		name: "Actions",
		width: "110",
		component: Actions,
	},
	{
		name: "Actions-Canvas",
		label: "Actions",
		width: "70",
		component: ActionsCanvas,
	},
];

const SortOrders = [null, "asc", "desc"];

const SortOrderIcons = {
	asc: "arrow-up",
	desc: "arrow-down",
};

/**
 *
 * @param {string} widgetType
 * @param {function} filterPredicate
 * @param {Array} hideColumns
 * @param {function} onSelect
 * @returns {Element}
 * @constructor
 */
const WidgetsTable = ({
	widgetType = "calendar",
	filterPredicate,
	hideColumns = [],
	onSelect = () => {},
}) => {
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [widgetNameFilter, setWidgetNameFilter] = useState("");
	const [sortOption, setSortOption] = useState({ field: null, order: null });

	const templateFilterOptions = useMemo(() => {
		const options = AvailableTemplates[widgetType]?.map((i) => ({
			label: i.label,
			value: i.template,
		}));

		options.unshift({ label: "All templates", value: "" });
		return options;
	}, [widgetType]);

	const { widgets } = useWidgetsStore();

	const widgetItems = useMemo(() => {
		if (!widgets.collection) {
			return [];
		}
		return widgets.collection
			.filter((i) => i.widget_type === widgetType)
			.filter((i) =>
				selectedTemplate.length ? selectedTemplate === i.template : true
			)
			.filter((i) =>
				widgetNameFilter.length
					? i.name.toLowerCase().includes(widgetNameFilter)
					: true
			)
			.sort(
				sortOption.order
					? Columns.find((c) => c.name === sortOption.field).sort(
							sortOption.order
					  )
					: undefined
			);
	}, [
		widgetType,
		selectedTemplate,
		widgetNameFilter,
		widgets.collection,
		sortOption,
		widgetType,
	]);

	/**
	 *
	 * @type {function(*): void}
	 */
	const onSelectTemplate = useCallback(
		(value) => setSelectedTemplate(value),
		[selectedTemplate]
	);

	/**
	 *
	 * @type {function(*): void}
	 */
	const onFilterNameChange = useCallback(
		(value) => setWidgetNameFilter(value.toLowerCase()),
		[widgetNameFilter]
	);

	/**
	 *
	 * @type {function(*): void}
	 */
	const onChangeSort = useCallback(
		(field, value) => (e) => {
			console.log(field, value);
			setSortOption((prev) => ({
				field,
				order:
					prev.field !== field
						? "asc"
						: SortOrders[(SortOrders.indexOf(value) + 1) % SortOrders.length],
			}));
		},
		[sortOption]
	);

	const columns = useMemo(
		() => Columns.filter((column) => !hideColumns.includes(column.name)),
		[hideColumns]
	);

	const columnsHeaders = useMemo(
		() =>
			columns.map((column) => {
				const sortable = column.sort ? (
					<IconButton
						icon={
							!sortOption.order || sortOption.field !== column.name
								? "sort"
								: SortOrderIcons[sortOption.order]
						}
						onClick={onChangeSort(column.name, sortOption.order)}
					></IconButton>
				) : (
					""
				);
				return (
					<th width={column.width}>
						{column.label || column.name} {sortable}
					</th>
				);
			}),
		[columns, sortOption]
	);

	const items = widgetItems.filter(filterPredicate).map((item) => {
		return (
			<tr key={item.uuid}>
				{columns.map((column) => {
					const Component = column.component;
					return (
						<td key={`${column.name}${item.uuid}`}>
							<Component
								row={item}
								widgetType={widgetType}
								onSelect={onSelect}
							/>
						</td>
					);
				})}
			</tr>
		);
	});

	if (widgets.fetch) {
		return <InitialLoading />;
	}

	if (widgets.fetchError) {
		// return <div>Error loading widgets</div>;
		return (
			<ErrorMessage
				error={widgets.fetchError}
				action={"reading widgets list"}
			/>
		);
	}

	return (
		<div className={"rev-widgets-table-wrapper"}>
			<div className={"rev-widgets-table-header"}>
				<div className={"rev-widgets-table-header-controls"}>
					<TextControl
						placeholder={"Filter by name"}
						onChange={onFilterNameChange}
					></TextControl>
					<SelectControl
						options={templateFilterOptions}
						onChange={onSelectTemplate}
					/>
					<Button variant={"secondary"}>Clear</Button>
				</div>
				<div>
					<AddNewButton widgetType={widgetType} />
				</div>
			</div>
			<div className={"rev-widgets-table-container"}>
				<table className={"rev-widgets-table"}>
					<thead>
						<tr>{columnsHeaders}</tr>
					</thead>
					<tbody>{items}</tbody>
				</table>
			</div>
		</div>
	);
};

export default WidgetsTable;
