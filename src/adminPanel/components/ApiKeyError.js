/**
 * Created by piotr.pozniak@thebeaverhead.com on 03/02/2025
 */
import { Button, Card, CardBody } from "@wordpress/components";
import React from "react";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import appConfig from "../../config/appConfig";

const ApiKeyError = () => {
	const { wpSettings } = useWPSettingsStore();
	return (
		<div className={"rev--welcome-container"}>
			<div className={"rev-welcome-container-item"}>
				<Card className={"rev--welcome-card_login"}>
					<CardBody>
						<div className={"rev--welcome-card_login-heading"}>
							<img
								src={"/wp-content/plugins/revisual/public/rev/img/icon.png"}
							/>
							<h2>Link with {appConfig.appName} is broken!</h2>
						</div>
						<p>
							For some reason, we could not pull your {appConfig.appName} data.
							Your API KEY is invalid.
						</p>
						<p>
							Click the button below to re-link {appConfig.appName} with your
							WordPress page.
						</p>

						<Button
							variant="secondary"
							href={wpSettings.model.authUrl}
							className={"rev--welcome-btn"}
						>
							Re-Login
						</Button>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default ApiKeyError;
