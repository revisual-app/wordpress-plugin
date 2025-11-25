/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2024
 */

import React from "react";
import { Button, Card, CardBody, Flex } from "@wordpress/components";
import { useCallback } from "@wordpress/element";

/**
 *
 * @param {string} widgetType
 * @param {function} setAttributes
 * @returns {Element}
 * @constructor
 */
const Placeholder = ({ widgetType, setAttributes }) => {
  /**
   *
   * @type {(function(*): void)|*}
   */
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
    <div className={"rev-block-canvas-placeholder"}>
      <Card isRounded={false}>
        {/*<CardHeader>*/}
        {/*<div className={"rev-block-canvas-placeholder-header"}>
            <div className={"rev-block-canvas-placeholder-title"}>
              <span>
                <AppIcon width={"24"} />
                {__("Revisual widget", "revisual")}
              </span>
              <RefreshWidgetsList />
            </div>
          </div>*/}
        {/*</CardHeader>*/}
        <CardBody>
          <Flex>
            <h3> ⚠️ Revisual setup is incomplete.</h3>
            <Button
              variant="primary"
              href={"/wp-admin/admin.php?page=revisual"}
              target={"_RevisualSettings"}
              className={"rev--welcome-btn"}
            >
              Go to setup...
            </Button>
          </Flex>
          <div className={"rev-block-canvas-placeholder-container"}>
            <p>
              Connect with Revisual first, finish setup to embed your widgets.
            </p>
          </div>
          {/*<WidgetsTable onSelect={onSelect} widgetType={widgetType} />*/}
        </CardBody>
      </Card>
    </div>
  );
};

export default Placeholder;
