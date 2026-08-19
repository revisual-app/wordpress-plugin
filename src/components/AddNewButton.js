/**
 * Create button — design-system primary. Goes to src/components/AddNewButton.js
 * (replace). The old version used a WP <Button variant="primary"> plus a literal
 * "&nbsp;" in the label, which React rendered as text.
 */

import React from "react";
import appConfig from "../config/appConfig";
import { AvailableWidgets, WidgetsNames } from "../consts";
import { ArrowUpRight } from "../icons";

/**
 * @param {string} widgetType
 * @returns {Element}
 * @constructor
 */
const AddNewButton = ({ widgetType }) => {
  const widgetConfig = AvailableWidgets.find((i) => i.name === widgetType);

  return (
    <a
      className={"rev--btn rev--btn_primary"}
      href={appConfig.appUrl + widgetConfig.newItemUrl}
      target={`_new_${widgetType}`}
    >
      Create {WidgetsNames[widgetType].singular.toLowerCase()}
      <ArrowUpRight size={16} />
    </a>
  );
};

export default AddNewButton;
