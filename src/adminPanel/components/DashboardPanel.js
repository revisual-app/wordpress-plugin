/**
 * Dashboard — at-a-glance counts, then straight into the calendars list.
 * Deliberately thin: the plugin has no analytics of its own, so this reads the
 * widgets collection already in the store rather than inventing metrics.
 */

import React from "react";
import { useMemo } from "@wordpress/element";
import { useWidgetsStore } from "../../hooks/useWidgets";
import { useOrgInfoStore } from "../../hooks/useOrgInfo";
import PageHeader from "./PageHeader";
import RefreshWidgetsList from "../../components/RefreshWidgetsList";
import AddNewButton from "../../components/AddNewButton";
import appConfig from "../../config/appConfig";
import { ArrowUpRight } from "../../icons";

const DashboardPanel = ({ onNavigate }) => {
  const { widgets } = useWidgetsStore();
  const { orgInfo } = useOrgInfoStore();

  const stats = useMemo(() => {
    const all = widgets.collection || [];
    const published = all.filter((i) => i.available === 1 && i.integration);
    return [
      { label: "Calendars", value: all.length },
      { label: "Published", value: published.length },
      { label: "Unavailable", value: all.length - published.length },
    ];
  }, [widgets.collection]);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${orgInfo.model?.name || ""}`}
        subtitle={"Everything you have published to this site, at a glance."}
        actions={
          <>
            <RefreshWidgetsList showLabel={true} />
            <AddNewButton widgetType={"calendar"} />
          </>
        }
      />

      <div className={"rev--stats"}>
        {stats.map((stat) => (
          <div className={"rev--stat"} key={stat.label}>
            <span className={"rev--stat-label"}>{stat.label}</span>
            <span className={"rev--stat-value"}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className={"rev--card rev--card_prompt"}>
        <div>
          <h2 className={"rev--card-title"}>Place a calendar on your site</h2>
          <p className={"rev--card-text"}>
            Copy a shortcode from the calendars list and paste it into any page,
            post or widget area.
          </p>
        </div>
        <div className={"rev--card-actions"}>
          <button
            type={"button"}
            className={"rev--btn rev--btn_secondary"}
            onClick={() => onNavigate("calendar")}
          >
            View calendars
          </button>
          <a
            className={"rev--btn rev--btn_primary"}
            href={appConfig.appUrl}
            target={"_revisual"}
          >
            Open {appConfig.appName}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
};

export default DashboardPanel;
