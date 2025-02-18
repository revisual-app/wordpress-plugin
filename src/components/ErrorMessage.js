/**
 * Created by piotr.pozniak@thebeaverhead.com on 11/02/2025
 */

import React from "react";
import {
	Card,
	CardBody,
	CardDivider,
	Flex,
	FlexItem,
	Panel,
	PanelBody,
	PanelRow,
} from "@wordpress/components";
import appConfig from "../config/appConfig";
import { useMemo } from "@wordpress/element";

const ErrorMessage = ({ error, action }) => {
	const errorMessage = useMemo(() => {
		let _e = "Something went wrong!";

		if (error && error.message) {
			_e = error.message;
		}

		if (error && error.response && error.response.data) {
			_e = error.response.data.message;
		}

		if (_e.includes("</") || _e.includes("</")) {
			return <div dangerouslySetInnerHTML={{ __html: _e }}></div>;
		}

		return _e;
	}, [error]);

	const errorFile = useMemo(() => {
		let file = null;
		if (error && error.data && error.data.error) {
			file = error.data.error.file;

			// read line
			if (error.data.error.line) {
				file += ":" + error.data.error.line;
			}
		}

		return file;
	}, [error]);

	const errorStack = useMemo(() => {
		let message = null;
		if (error && error.data && error.data.error.message) {
			message = error.data.error.message;
		}

		return <pre dangerouslySetInnerHTML={{ __html: message }}></pre>;
	}, [error]);

	const details =
		errorFile || errorStack ? (
			<Panel>
				<PanelBody title="Details" initialOpen={false}>
					<PanelRow>
						<div>
							<Flex justify={"flex-start"}>
								<FlexItem>
									<strong>File</strong>
								</FlexItem>
								<FlexItem>{errorFile}</FlexItem>
							</Flex>
							<div>
								<div>
									<strong>Message</strong>
								</div>
								<div>{errorStack}</div>
							</div>
						</div>
					</PanelRow>
				</PanelBody>
			</Panel>
		) : null;

	return (
		<Card>
			<CardBody>
				<h3>A problem occurred while {action}.</h3>
				{errorMessage}

				{details}
				<CardDivider margin={5} />
				<div>
					Find more information in the console or{" "}
					<a href={appConfig.helpdeskUrl} target={"support"}>
						contact the support
					</a>
					.
				</div>
			</CardBody>
		</Card>
	);
};

export default ErrorMessage;
