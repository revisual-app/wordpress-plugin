/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/01/2025
 */

import React from "react";
import { Tooltip } from "@wordpress/components";

const IntegrationType = ({ integration }) => {
	return (
		<Tooltip text={integration?.name}>
			<div>{integration?.name}</div>
		</Tooltip>
	);
};

export default IntegrationType;
