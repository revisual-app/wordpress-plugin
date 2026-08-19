/**
 * Connected admin shell: app bar above, active screen below.
 */

import React from "react";
import { useState } from "@wordpress/element";
import AppBar from "./AppBar";
import CalendarsPanel from "./widgetsPanel/CalendarsPanel";
import DashboardPanel from "./DashboardPanel";
import ApiKeyError from "./ApiKeyError";
import ConnectionError from "./ConnectionError";
import DashboardSkeleton from "./DashboardSkeleton";
import { useOrgInfoStore } from "../../hooks/useOrgInfo";
import { AvailableWidgets } from "../../consts";

const AppPanel = () => {
  const { orgInfo } = useOrgInfoStore();
  const [screen, setScreen] = useState("dashboard");

  const connected = orgInfo.model && !orgInfo.fetchError && !orgInfo.fetch;
  const apiKeyExpired = orgInfo.fetchError && orgInfo.fetchError.code === 401;

  let content = null;

  if (apiKeyExpired) {
    content = <ApiKeyError />;
  } else if (orgInfo.fetchError) {
    // Anything other than 401: the key is fine, the API isn't answering.
    content = <ConnectionError />;
  } else if (orgInfo.fetch || (!orgInfo.model && !orgInfo.fetchError)) {
    // Initial load: skeleton of the screen we are about to show, not a spinner.
    content = <DashboardSkeleton />;
  } else if (connected) {
    content =
      screen === "dashboard" ? (
        <DashboardPanel onNavigate={setScreen} />
      ) : (
        <CalendarsPanel
          widgetType={
            AvailableWidgets.find((w) => w.name === screen)?.name || "calendar"
          }
        />
      );
  }

  return (
    <div className={"rev--app"}>
      <AppBar screen={screen} onNavigate={setScreen} />
      <div className={"rev--app-body"}>{content}</div>
    </div>
  );
};

export default AppPanel;
