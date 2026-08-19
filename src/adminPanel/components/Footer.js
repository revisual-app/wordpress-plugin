/**
 * Footer — single row, Untitled UI treatment (direction 2a).
 * Replaces src/adminPanel/components/Footer.js
 *
 * Was: a Flex of wp-components <ExternalLink> plus a separate .footer /
 * .container / .row / .col-md-12 / .footer-text block for the copyright.
 * Now: one row, links left, copyright right.
 *
 * Plain anchors rather than <ExternalLink> for the same reason .rev--btn is a
 * plain anchor — wp-components styles the link WP blue with its own icon.
 * The assistive "(opens in a new tab)" text ExternalLink provides is kept.
 */

import { memo } from "react";
import appConfig from "../../config/appConfig";

const links = [
  { label: "Homepage", href: "https://revisual.io" },
  { label: "Help desk", href: appConfig.helpdeskUrl },
  { label: "Feedback", href: "https://feedback.revisual.io" },
];

const fullYear = new Date().getFullYear();

const Footer = () => (
  <div className={"rev--footer"}>
    <nav className={"rev--footer-links"}>
      {links.map((link) => (
        <a
          className={"rev--footer-link"}
          href={link.href}
          key={link.label}
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          {link.label}
          <span className={"rev--footer-link-icon"} aria-hidden="true">
            {"\u2197"}
          </span>
          <span className={"screen-reader-text"}>(opens in a new tab)</span>
        </a>
      ))}
    </nav>
    <p className={"rev--footer-copyright"}>
      {`\u00A9 ${fullYear} ${appConfig.appName}. All rights reserved.`}
    </p>
  </div>
);

export default memo(Footer);
