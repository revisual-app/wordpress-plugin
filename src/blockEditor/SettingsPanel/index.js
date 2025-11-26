/**
 * Created by piotr.pozniak@thebeaverhead.com on 08/07/2024
 */

import React from "react";
import { Button, PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { useState, useCallback, useMemo } from "@wordpress/element";
import WidgetsList from "./../WidgetsList";
import WidgetTabsPanel from "../../adminPanel/components/WidgetTabsPanel";
import AddNewButton from "../../components/AddNewButton";
import { WT } from "../../consts";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";
import InitialLoading from "../../adminPanel/components/InitialLoading";
import { useWidgetsStore } from "../../hooks/useWidgets";
import { useWPSettingsStore } from "../../hooks/useWPSettings";

/**
 *
 * @param {function} setAttributes
 * @param {boolean} hasWidgets
 * @param {boolean} isLoading
 * @param {boolean} isRevisualSetupComplete
 * @returns {Element}
 * @constructor
 */
const SettingsPanel = ({
  setAttributes,
  hasWidgets,
  isLoading,
  isRevisualSetupComplete,
}) => {
  const [widgetType, setWidgetType] = useState(WT.calendar);

  const { widgets } = useWidgetsStore();
  const { wpSettings } = useWPSettingsStore();

  /**
   *
   * @type {(value: (((prevState: string) => string) | string)) => void}
   */
  const onChangeSelectField = useCallback(
    (value) => {
      if (widgetType === value) {
        return;
      }
      setWidgetType(value);
      setAttributes({
        widgetType: value,
        uuid: undefined,
      });
    },
    [widgetType, setAttributes],
  );

  /**
   *
   * @type {(function(*): void)|*}
   */
  const onWidgetSelect = useCallback(
    (widget) => {
      setAttributes({
        widgetType: widget.widget_type,
        uuid: widget.uuid,
        template: widget.template,
        widgetSlug: widget.slug,
      });
    },
    [widgetType, setAttributes],
  );

  const label = useMemo(() => {
    let _label = "Select widget you want to display.";

    if (isLoading) {
      _label = <InitialLoading />;
    } else if (!hasWidgets) {
      _label = "There are no widgets available.";
    }

    if (widgets.fetchError || wpSettings.fetchError) {
      _label = (
        <>
          An error occurred.{" "}
          <a href={"/wp-admin/admin.php?page=revisual"} target={"_dashboard"}>
            Go to dashboard for more details.
          </a>
        </>
      );
    }

    return <p>{_label}</p>;
  }, [hasWidgets, isLoading, widgets.fetchError, wpSettings.fetchError]);

  const content = isRevisualSetupComplete ? (
    <>
      <div className={"rev-panel-header"}>
        <div className={"rev-panel-header-actions"}>
          <AddNewButton widgetType={widgetType} variant={"secondary"} />
          <RefreshWidgetsList variant={"secondary"} showLabel={true} />
        </div>
      </div>
      <WidgetTabsPanel onTabChange={onChangeSelectField}>
        {(tab) => (
          <>
            {label}

            <WidgetsList widgetType={tab.name} onSelect={onWidgetSelect} />
          </>
        )}
      </WidgetTabsPanel>
      <p>&nbsp;</p>{" "}
    </>
  ) : (
    <div>
      <p>Connect with Revisual first, finish setup to embed your widgets.</p>
      <Button
        variant="secondary"
        href={"/wp-admin/admin.php?page=revisual"}
        target={"_RevisualSettings"}
      >
        Go to Revisual settings...
      </Button>
    </div>
  );

  return (
    <>
      <InspectorControls>
        <PanelBody>{content}</PanelBody>
      </InspectorControls>
    </>
  );
};

export default SettingsPanel;
