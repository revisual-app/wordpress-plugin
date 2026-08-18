/**
 * Page header — title, supporting line, actions. One per screen.
 */

import React from "react";

const PageHeader = ({ title, subtitle, actions }) => (
	<div className={"rev--page-header"}>
		<div className={"rev--page-header-text"}>
			<h1 className={"rev--page-title"}>{title}</h1>
			{subtitle ? <p className={"rev--page-subtitle"}>{subtitle}</p> : null}
		</div>
		{actions ? <div className={"rev--page-header-actions"}>{actions}</div> : null}
	</div>
);

export default PageHeader;
