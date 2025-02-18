/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import React from "react";
import { ExternalLink, Flex, FlexItem } from "@wordpress/components";
import appConfig from "../../config/appConfig";

// const space = (n) => {
// 	return n * 8;
// };
const Footer = (props) => {
	// console.log(space(2));
	return (
		<>
			<Flex gap={4} justify={"flex-start"} className={"rev--footer-container"}>
				<FlexItem>
					<ExternalLink href="https://revisual.io">Homepage</ExternalLink>
				</FlexItem>
				<FlexItem>
					<ExternalLink href={appConfig.helpdeskUrl}>Help desk</ExternalLink>
				</FlexItem>
				<FlexItem>
					<ExternalLink href="https://feedback.revisual.io">
						Feedback
					</ExternalLink>
				</FlexItem>
			</Flex>
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="footer-text">
								<p>
									© {new Date().getFullYear()} Revisual. All Rights Reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
