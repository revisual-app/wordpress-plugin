import { useEffect, useState } from "@wordpress/element";
import InitialLoading from "./components/InitialLoading";
import { useWPSettingsStore } from "./../hooks/useWPSettings";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import { useOrgInfoStore } from "./../hooks/useOrgInfo";
import AppPanel from "./components/AppPanel";
import { useWidgetsStore } from "./../hooks/useWidgets";
import { Toaster } from "sonner";
import "sonner/dist/styles.css";
import ErrorMessage from "../components/ErrorMessage";
import appConfig from "../config/appConfig";
const MainPage = () => {
	const { wpSettings, fetchWpSettings } = useWPSettingsStore();
	const { fetchOrgInfo, orgInfo } = useOrgInfoStore();
	const { fetchWidgets } = useWidgetsStore();

	useEffect(() => {
		fetchWpSettings();
	}, []);

	useEffect(() => {
		if (wpSettings.fetchSuccess && wpSettings.model.apiKey) {
			fetchOrgInfo();
		}
	}, [wpSettings.fetchSuccess]);

	useEffect(() => {
		if (orgInfo.fetchSuccess && wpSettings.model.apiKey) {
			fetchWidgets();
		}
	}, [orgInfo.fetchSuccess]);

	const initialLoading = wpSettings.fetch ? <InitialLoading /> : null;

	const welcomePage =
		wpSettings.fetchSuccess && !wpSettings.model.apiKey ? (
			<WelcomePage />
		) : null;

	const appPanel = wpSettings.model.apiKey ? <AppPanel /> : null;

	const fetchWPSettingsErrors = wpSettings.fetchError ? (
		<ErrorMessage
			error={wpSettings.fetchError}
			action={"Reading WordPress settings"}
		/>
	) : null;

	const fetchOrgInfoErrors =
		orgInfo.fetchError && orgInfo.fetchError.code !== 401 ? (
			<ErrorMessage
				error={orgInfo.fetchError}
				action={`Reading your ${appConfig.appName} settings`}
			/>
		) : null;

	return (
		<div className={"rev--admin-settings-container"}>
			{fetchWPSettingsErrors}
			{fetchOrgInfoErrors}
			{initialLoading}
			{welcomePage}
			{appPanel}
			<Footer />
			<Toaster position="top-center" />
		</div>
	);
};

export default MainPage;
