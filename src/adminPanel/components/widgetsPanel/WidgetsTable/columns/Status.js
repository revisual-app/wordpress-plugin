/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

import React from "react";

const Status = ({ row }) => {
	let label = "Published";

	if (row.available !== 1) {
		label = "Not published";
	}

	if (!row.integration) {
		label = "Not integrated";
	}

	return <>{label}</>;
};

export default Status;
