/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";
import IntegrationType from "../IntegrationType";

const Integration = ({ row }) => {
	return <IntegrationType integration={row.integration} />;
};

export default Integration;
