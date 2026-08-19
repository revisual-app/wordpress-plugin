/**
 * MainPage — replaces src/adminPanel/MainPage.js.
 *
 * Two changes over the original:
 *  1. Both error cards get a retry, so a rejected fetchWpSettings / fetchOrgInfo
 *     is no longer a dead end (previously the screen rendered the error card and
 *     nothing else — no button, no way back).
 *  2. A failed WP settings read hides the rest of the admin screen: without
 *     wpSettings there is no apiKey, so neither the welcome page nor the app
 *     panel can render anything meaningful.
 */

import { useEffect } from "@wordpress/element";
import { useWPSettingsStore } from "./../hooks/useWPSettings";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import { useOrgInfoStore } from "./../hooks/useOrgInfo";
import AppPanel from "./components/AppPanel";
import { useWidgetsStore } from "./../hooks/useWidgets";
import { Toaster } from "sonner";
import "sonner/dist/styles.css";
import ErrorMessage from "../components/ErrorMessage";
import DashboardSkeleton from "./components/DashboardSkeleton";
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

  // Settings failed: the only thing on screen is the error, so it owns recovery.
  if (wpSettings.fetchError) {
    return (
      <div className={"rev--admin-settings-container"}>
        <ErrorMessage
          error={wpSettings.fetchError}
          action={"Reading WordPress settings"}
          onRetry={fetchWpSettings}
          retrying={wpSettings.fetch}
        />
        <Footer />
        <Toaster position="top-center" />
      </div>
    );
  }

  const initialLoading = wpSettings.fetch ? <DashboardSkeleton /> : null;

  const welcomePage =
    wpSettings.fetchSuccess && !wpSettings.model.apiKey ? (
      <WelcomePage />
    ) : null;

  const appPanel = wpSettings.model.apiKey ? <AppPanel /> : null;

  // AppPanel renders ApiKeyError (401) and ConnectionError (everything else),
  // so MainPage only reports org errors when there is no panel to host them.
  const fetchOrgInfoErrors =
    !appPanel && orgInfo.fetchError ? (
      <ErrorMessage
        error={orgInfo.fetchError}
        action={`Reading your ${appConfig.appName} settings`}
        onRetry={fetchOrgInfo}
        retrying={orgInfo.fetch}
      />
    ) : null;

  return (
    <div className={"rev--admin-settings-container"}>
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
