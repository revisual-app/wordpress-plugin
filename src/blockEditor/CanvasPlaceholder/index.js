/**
 * Canvas placeholder — the block's initial state: pick a published calendar.
 *
 * Replaces src/blockEditor/CanvasPlaceholder/index.js (Card/CardHeader/CardBody
 * from @wordpress/components + EmbeddableWidgetsTab, which inherited theme
 * typography and rendered two paragraphs of instructions above a table that
 * overflowed the block).
 *
 * Everything is sized in px inside .rev-blk so the theme's editor styles can't
 * inflate it, and the picker is a card grid: the whole tile is the target, and
 * it reflows at any block width instead of clipping a column.
 */

import React from "react";
import { useCallback } from "@wordpress/element";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";
import AddNewButton from "../../components/AddNewButton";
import BlockShell from "../BlockShell";
import WidgetPicker from "./WidgetPicker";

const Placeholder = ({ widgetType = "calendar", setAttributes }) => {
  const onSelect = useCallback(
    (widget) => {
      setAttributes({
        widget_type: widget.widget_type,
        widgetType: widget.widget_type,
        uuid: widget.uuid,
        template: widget.template,
        widgetSlug: widget.slug,
      });
    },
    [setAttributes],
  );

  return (
    <BlockShell
      widgetType={widgetType}
      hint={"pick one to embed"}
      actions={
        <>
          <RefreshWidgetsList />
          <AddNewButton widgetType={widgetType} />
        </>
      }
    >
      <WidgetPicker widgetType={widgetType} onSelect={onSelect} />
    </BlockShell>
  );
};

export default Placeholder;
