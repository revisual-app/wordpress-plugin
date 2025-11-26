/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2024
 */

import React, { useCallback } from "react";
import { Button, Card, CardBody, Flex } from "@wordpress/components";

/**
 *
 * @returns {Element}
 * @constructor
 */
const Placeholder = ({}) => {
  const onGoToSettings = useCallback(() => {
    window.open("/wp-admin/admin.php?page=revisual");
  }, []);
  return (
    <div className={"rev-block-canvas-placeholder"}>
      <Card isRounded={false}>
        <CardBody>
          <Flex>
            <h3> ⚠️ Revisual setup is incomplete.</h3>
            <Button
              className="components-button is-primary"
              onClick={onGoToSettings}
              href={"/wp-admin/admin.php?page=revisual"}
              target={"_RevisualSettings"}
            >
              Go to Revisual settings...
            </Button>
          </Flex>
          <div className={"rev-block-canvas-placeholder-container"}>
            <p>
              Connect with Revisual first, finish setup to embed your widgets.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Placeholder;
