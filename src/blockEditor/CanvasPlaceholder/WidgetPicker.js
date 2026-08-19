/**
 * WidgetPicker — search, template filter and the selectable card grid.
 *
 * Replaces EmbeddableWidgetsTab (which reused the admin WidgetsTable and its
 * columns inside a ~600px block). Shows only integrated + published widgets,
 * six at a time, with the rest behind "Show N more" — a block canvas has no
 * room for pagination chrome.
 */

import React from "react";
import { useMemo, useState } from "@wordpress/element";
import { Spinner } from "@wordpress/components";
import { useWidgetsStore } from "../../hooks/useWidgets";
import { AvailableTemplates, WidgetsNames } from "../../consts";
import { widgetsFilter } from "../../adminPanel/components/widgetsPanel/PublishedWidgetsTab";
import { SearchLg, ChevronDown } from "../../icons";

const PAGE = 6;

const formatDate = (value) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
};

const WidgetPicker = ({ widgetType = "calendar", onSelect }) => {
  const { widgets } = useWidgetsStore();
  const [query, setQuery] = useState("");
  const [template, setTemplate] = useState("");
  const [sort, setSort] = useState("recent");
  const [expanded, setExpanded] = useState(false);

  const templates = AvailableTemplates[widgetType] || [];
  const labelOf = (value) =>
    templates.find((i) => i.template === value)?.label || value;

  const available = useMemo(
    () =>
      widgets.collection
        .filter((i) => i.widget_type === widgetType)
        .filter(widgetsFilter),
    [widgets.collection, widgetType],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available
      .filter((i) => (template ? i.template === template : true))
      .filter((i) => (q ? (i.name || "").toLowerCase().includes(q) : true))
      .sort((a, b) =>
        sort === "name"
          ? (a.name || "").localeCompare(b.name || "", undefined, {
              sensitivity: "base",
            })
          : (b.modified || 0) - (a.modified || 0),
      );
  }, [available, query, template, sort]);

  const shown = expanded ? matches : matches.slice(0, PAGE);
  const hidden = matches.length - shown.length;
  const plural = (WidgetsNames[widgetType]?.title || "widgets").toLowerCase();

  return (
    <>
      <div className={"rev-blk-toolbar"}>
        <label className={"rev-blk-search"}>
          <SearchLg size={14} className={"rev-blk-search-icon"} />
          <input
            type={"search"}
            className={"rev-blk-search-input"}
            placeholder={`Search ${plural}`}
            aria-label={`Search ${plural} by name`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <span className={"rev-blk-select"}>
          <select
            className={"rev-blk-select-input"}
            value={template}
            aria-label={"Filter by template"}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value={""}>All templates</option>
            {templates.map((i) => (
              <option value={i.template} key={i.template}>
                {i.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={"rev-blk-select-caret"} />
        </span>

        <div className={"rev-blk-sort"} role={"group"} aria-label={"Sort"}>
          <button
            type={"button"}
            className={`rev-blk-sort-btn${
              sort === "recent" ? " rev-blk-sort-btn_on" : ""
            }`}
            aria-pressed={sort === "recent"}
            onClick={() => setSort("recent")}
          >
            Recent
          </button>
          <button
            type={"button"}
            className={`rev-blk-sort-btn${
              sort === "name" ? " rev-blk-sort-btn_on" : ""
            }`}
            aria-pressed={sort === "name"}
            onClick={() => setSort("name")}
          >
            A–Z
          </button>
        </div>

        <span className={"rev-blk-count"}>
          {widgets.fetch ? <Spinner /> : null}
          {matches.length} published
        </span>
      </div>

      {shown.length ? (
        <div className={"rev-blk-grid"}>
          {shown.map((widget) => (
            <button
              type={"button"}
              className={"rev-blk-card"}
              key={widget.uuid}
              onClick={() => onSelect(widget)}
            >
              <span className={"rev-blk-card-name"}>{widget.name}</span>
              <span className={"rev-blk-card-meta"}>
                {labelOf(widget.template)}
                {widget.modified ? ` · ${formatDate(widget.modified)}` : null}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className={"rev-blk-empty"}>
          {query || template
            ? `No ${plural} match that filter.`
            : `No published ${plural} yet.`}
        </p>
      )}

      <div className={"rev-blk-footer"}>
        <span className={"rev-blk-footer-note"}>
          Only integrated, published {plural} appear here. Publish in Revisual,
          then refresh.
        </span>
        {hidden > 0 ? (
          <button
            type={"button"}
            className={"rev-blk-more"}
            onClick={() => setExpanded(true)}
          >
            Show {hidden} more
          </button>
        ) : null}
      </div>
    </>
  );
};

export default WidgetPicker;
