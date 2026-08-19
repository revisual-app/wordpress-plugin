/**
 * Inspector sidebar — swap the embedded widget for another one.
 *
 * Replaces src/blockEditor/SettingsPanel/index.js + WidgetsList/*, which
 * rendered a full-width "Create calendar", a full-width "Refresh", a one-tab
 * TabPanel, an instruction line, and then every widget as name / template /
 * three unstyled WP buttons (Insert, Preview, Edit) — about 120px of vertical
 * space each, in a 280px column.
 *
 * Here each widget is one row: name, template, and the actions as icon buttons
 * that appear on hover or focus. Insert stays visible because it is the reason
 * the panel is open. Search is always on top; with a dozen calendars the old
 * list was pure scrolling.
 */

import React from "react";
import { useMemo, useState } from "@wordpress/element";
import { PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useWidgetsStore } from "../../hooks/useWidgets";
import { AvailableTemplates, WidgetsNames } from "../../consts";
import { widgetsFilter } from "../../adminPanel/components/widgetsPanel/PublishedWidgetsTab";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";
import AddNewButton from "../../components/AddNewButton";
import appConfig from "../../config/appConfig";
import { SearchLg, Edit01, Check } from "../../icons";

const SettingsPanel = ({
  attributes = {},
  setAttributes,
  widgetType = "calendar",
}) => {
  const { widgets } = useWidgetsStore();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");

  // `edit.js` doesn't always forward `attributes` to the inspector, so fall
  // back to reading the selected block's own attributes. Without this the
  // embedded widget never highlights in the list.
  const selectedBlockUuid = useSelect(
    (select) =>
      select("core/block-editor")?.getSelectedBlock()?.attributes?.uuid ?? null,
    [],
  );

  const templates = AvailableTemplates[widgetType] || [];
  const labelOf = (value) =>
    templates.find((i) => i.template === value)?.label || value;

  const plural = (WidgetsNames[widgetType]?.title || "widgets").toLowerCase();

  // The block stores the embedded widget's id; the collection may type it
  // differently (number vs string), so compare as strings once here.
  const rawUuid = attributes?.uuid ?? selectedBlockUuid;
  const selectedUuid =
    rawUuid !== undefined && rawUuid !== null ? String(rawUuid) : "";

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (
      widgets.collection
        .filter((i) => i.widget_type === widgetType)
        .filter(widgetsFilter)
        .filter((i) => (q ? (i.name || "").toLowerCase().includes(q) : true))
        // Embedded one first, so it is visible without scrolling a long list;
        // then last modified newest-first, or by name.
        .sort((a, b) => {
          if (selectedUuid) {
            const pinned =
              (String(b.uuid) === selectedUuid) -
              (String(a.uuid) === selectedUuid);
            if (pinned) {
              return pinned;
            }
          }
          if (sort === "name") {
            return (a.name || "").localeCompare(b.name || "", undefined, {
              sensitivity: "base",
            });
          }
          return (b.modified || 0) - (a.modified || 0);
        })
    );
  }, [widgets.collection, widgetType, query, selectedUuid, sort]);

  const onInsert = (widget) =>
    setAttributes({
      widget_type: widget.widget_type,
      widgetType: widget.widget_type,
      uuid: widget.uuid,
      template: widget.template,
      widgetSlug: widget.slug,
    });

  return (
    <InspectorControls>
      <PanelBody title={`${WidgetsNames[widgetType]?.title || "Widgets"}`}>
        <div className={"rev-side"}>
          <div className={"rev-side-actions"}>
            <AddNewButton widgetType={widgetType} />
            <RefreshWidgetsList />
          </div>

          <label className={"rev-side-search"}>
            <SearchLg size={14} className={"rev-side-search-icon"} />
            <input
              type={"search"}
              className={"rev-side-search-input"}
              placeholder={`Search ${plural}`}
              aria-label={`Search ${plural} by name`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div className={"rev-side-sort"} role={"group"} aria-label={"Sort"}>
            <button
              type={"button"}
              className={`rev-side-sort-btn${
                sort === "recent" ? " rev-side-sort-btn_on" : ""
              }`}
              aria-pressed={sort === "recent"}
              onClick={() => setSort("recent")}
            >
              Recent
            </button>
            <button
              type={"button"}
              className={`rev-side-sort-btn${
                sort === "name" ? " rev-side-sort-btn_on" : ""
              }`}
              aria-pressed={sort === "name"}
              onClick={() => setSort("name")}
            >
              A–Z
            </button>
          </div>

          {matches.length ? (
            <ul className={"rev-side-list"}>
              {matches.map((widget) => {
                const current =
                  !!selectedUuid && String(widget.uuid) === selectedUuid;

                return (
                  <li
                    className={`rev-side-item${
                      current ? " rev-side-item_current" : ""
                    }`}
                    key={widget.uuid}
                  >
                    <span className={"rev-side-item-text"}>
                      <span className={"rev-side-item-name"}>
                        {widget.name}
                      </span>
                      <span className={"rev-side-item-meta"}>
                        {labelOf(widget.template)}
                      </span>
                    </span>

                    <span className={"rev-side-item-actions"}>
                      <a
                        className={"rev-side-icon-btn"}
                        href={`${appConfig.appUrl}/${widgetType}/${widget.uuid}`}
                        target={"_revisual"}
                        title={`Edit in ${appConfig.appName}`}
                        aria-label={`Edit ${widget.name} in ${appConfig.appName}`}
                      >
                        <Edit01 size={14} />
                      </a>

                      {current ? (
                        <span
                          className={"rev-side-current"}
                          title={"Currently embedded"}
                        >
                          <Check size={14} />
                        </span>
                      ) : (
                        <button
                          type={"button"}
                          className={"rev-side-insert"}
                          onClick={() => onInsert(widget)}
                        >
                          Insert
                        </button>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={"rev-side-empty"}>
              {query
                ? `No ${plural} match “${query}”.`
                : `No published ${plural} yet.`}
            </p>
          )}
        </div>
      </PanelBody>
    </InspectorControls>
  );
};

export default SettingsPanel;
