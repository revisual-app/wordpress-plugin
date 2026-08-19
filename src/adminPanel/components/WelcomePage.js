/**
 * Welcome (disconnected) screen — Untitled UI treatment, Revisual brand ramp.
 * Original: plain WP Card pair. Replaces src/adminPanel/components/WelcomePage.js
 */

import React from "react";
import { useMemo } from "@wordpress/element";
import { useWPSettingsStore } from "../../hooks/useWPSettings";
import appConfig from "../../config/appConfig";

const IMG_BASE = "/wp-content/plugins/revisual/public/rev/img";

const steps = [
  {
    strong: "Create or log in",
    rest: ` to your free ${appConfig.appName} account`,
  },
  {
    strong: "Connect Google Calendar",
    rest: " and pick the calendars to sync",
  },
  {
    strong: "Paste the shortcode",
    rest: " into any post, page or block",
  },
];

const testimonial = {
  quote:
    "Using Revisual transformed the prestige of our company. When marketing to a new client, Revisual helps me gain their trust.",
  name: "Giorgos Grigorakos",
  role: "CEO, Make Music Memories",
  rating: 5,
};

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 2.5l2.9 6.05 6.6.92-4.8 4.6 1.18 6.53L12 17.5l-5.88 3.1L7.3 14.07l-4.8-4.6 6.6-.92z"
      fill="currentColor"
    />
  </svg>
);

const WelcomePage = () => {
  const { wpSettings } = useWPSettingsStore();

  const registerUrl = useMemo(() => {
    return `${appConfig.appUrl}/register?ref=wp-plugin&redirect=${encodeURIComponent(
      wpSettings.model.authUrl,
    )}`;
  }, [wpSettings.model.authUrl]);

  return (
    <>
      <h1 className={"rev--page-heading"}>{appConfig.appName}</h1>

      <div className={"rev--welcome"}>
        <div className={"rev--welcome-main"}>
          <div className={"rev--welcome-brand"}>
            <img
              className={"rev--welcome-brand-mark"}
              src={`${IMG_BASE}/icon.png`}
              alt={appConfig.appName}
            />
            <span className={"rev--welcome-brand-name"}>
              {appConfig.appName} for WordPress
            </span>
            <span className={"rev--welcome-badge"}>
              <span className={"rev--welcome-badge-dot"} aria-hidden="true" />
              Not connected
            </span>
          </div>

          <div className={"rev--welcome-copy"}>
            <h2 className={"rev--welcome-title"}>
              Publish your Google Calendar events on your site
            </h2>
            <p className={"rev--welcome-subtitle"}>
              Connect your {appConfig.appName} account to sync events, build
              embeddable calendars, and drop them into any page with a
              shortcode.
            </p>
          </div>

          <ol className={"rev--welcome-steps"}>
            {steps.map((step, i) => (
              <li className={"rev--welcome-step"} key={step.strong}>
                <span className={"rev--welcome-step-num"} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={"rev--welcome-step-text"}>
                  <strong>{step.strong}</strong>
                  {step.rest}
                </span>
              </li>
            ))}
          </ol>

          <div className={"rev--welcome-actions"}>
            <div className={"rev--welcome-buttons"}>
              <a className={"rev--btn rev--btn_primary"} href={registerUrl}>
                Create free account
              </a>
              <a
                className={"rev--btn rev--btn_secondary"}
                href={wpSettings.model.authUrl}
              >
                Log in
              </a>
            </div>
            <p className={"rev--welcome-hint"}>
              Free plan available — no credit card required. Already have an
              account? Just log in.
            </p>
          </div>
        </div>

        <div className={"rev--welcome-aside"}>
          <figure className={"rev--welcome-testimonial"}>
            <blockquote className={"rev--welcome-quote"}>
              {`\u201C${testimonial.quote}\u201D`}
            </blockquote>
            <figcaption className={"rev--welcome-cite"}>
              <span className={"rev--welcome-cite-who"}>
                <span className={"rev--welcome-cite-name"}>
                  {testimonial.name}
                </span>
                <span className={"rev--welcome-cite-role"}>
                  {testimonial.role}
                </span>
              </span>
              <span
                className={"rev--welcome-rating"}
                aria-label={`${testimonial.rating} out of 5`}
              >
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
            </figcaption>
          </figure>

          <div className={"rev--welcome-shot"}>
            <img
              className={"rev--welcome-shot-img"}
              src={`${IMG_BASE}/product-calendar.png`}
              alt={`A published calendar being styled in ${appConfig.appName}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
