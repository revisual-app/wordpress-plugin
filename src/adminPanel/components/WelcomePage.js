/**
 * Created by piotr.pozniak@thebeaverhead.com on 04/07/2024
 */

import React from "react";
import {
	Button,
	Card,
	CardBody,
	__experimentalHeading as Heading,
} from "@wordpress/components";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import appConfig from "../../config/appConfig";
import { useMemo } from "@wordpress/element";

const bgStyle = {
	backgroundImage:
		"wp-content/plugins/revisual/public/rev/img/welcome_background.png",
};

const WelcomePage = (props) => {
	const { wpSettings } = useWPSettingsStore();

	const registerUrl = useMemo(() => {
		return `${
			appConfig.appUrl
		}/register?ref=wp-plugin&redirect=${encodeURIComponent(
			wpSettings.model.authUrl
		)}`;
	}, [wpSettings.model.authUrl]);

	return (
		<>
			<Heading className={"rev--page-heading"}>Dashboard</Heading>
			<div className={"rev--welcome-container"}>
				<div className={"rev-welcome-container-item"}>
					<Card className={"rev--welcome-card_login"}>
						<CardBody>
							<div className={"rev--welcome-card_login-heading"}>
								<img
									src={"/wp-content/plugins/revisual/public/rev/img/icon.png"}
								/>
								<h2>Welcome to Revisual</h2>
							</div>

							<Button
								variant="secondary"
								href={wpSettings.model.authUrl}
								className={"rev--welcome-btn"}
							>
								Login
							</Button>
						</CardBody>
					</Card>
				</div>
				<div className={"rev-welcome-container-item"}>
					<Card
						className={"rev--welcome-card rev--welcome-card_info"}
						style={bgStyle}
					>
						<CardBody>
							<h1>
								Streamline, Sync, and Share
								<br /> your Events Seamlessly
							</h1>
							<p>
								Transform your event management process with Revisual.io, the
								cutting-edge platform that seamlessly integrates with Google
								Calendar. Sync your events, create beautiful, embeddable
								calendars, and share them effortlessly, all in a matter of
								minutes.
							</p>
							<Button
								variant="primary"
								href={registerUrl}
								className={"rev--welcome-btn"}
							>
								Create Account
							</Button>
							<img
								src={
									"/wp-content/plugins/revisual/public/rev/img/welcome_image.png"
								}
								width={"100%"}
							/>
						</CardBody>
					</Card>
				</div>
			</div>
		</>
	);
};

export default WelcomePage;
