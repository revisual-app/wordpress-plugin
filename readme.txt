=== Revisual – Event Communication for Google Calendar ===
Contributors:      piotrpoz, revisual
Tags:              google, calendar, events, revisual, embed
Tested up to:      7.0
Stable tag:        0.2.5
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 6.2

Turn your Google Calendar into a full event communication channel. Revisual connects your calendar to your website, QR codes, emails, and partner sites — automatically, beautifully, and from one source of truth.


== Description ==

Most organisations run events well. Few communicate them well. Revisual closes that gap.

Your Google Calendar is already where your events live. Revisual transforms it into a complete event communication system — distributing your programme automatically across your website, printed materials, partner sites, emails, and more. One update in Google Calendar, and every channel stays in sync.

= 🎯 The Problem Revisual Solves =

Event information is hard to keep consistent across channels. A time changes, a venue updates, a new session is added — and suddenly your website says one thing, your printed flyer says another, and your email said something else entirely.

Revisual makes your Google Calendar the single source of truth, then handles all the distribution for you. No copy-pasting. No manual updates across five platforms. No events that fall through the cracks.

= 🌐 One Calendar. Every Channel. =

Revisual connects your calendar to the channels your audience actually uses:

* **Your website** — beautiful, always-updated event widgets embedded with a shortcode or Gutenberg block
* **Partner and affiliate sites** — embed your calendar on multiple sites simultaneously; all stay in sync automatically
* **Printed materials** — QR codes that link directly to your live event listings, so even printed content stays fresh
* **Email campaigns** — shareable hosted event pages you can link to from any email or newsletter
* **Kiosks and displays** — simple script embed works anywhere, no WordPress required

= ✨ Features =

✔ Sync with Google Calendar & other calendar sources
✔ Automatic real-time updates — seconds after you make a change
✔ Unlimited event widgets
✔ Gutenberg block + shortcode embedding
✔ Fully customizable widget builder (250+ options)
✔ QR codes & hosted event pages
✔ Multiple widget layouts (list, grid, schedule, cards, slider, monthly view, and more)
✔ Event highlighting & branding options
✔ Simple script embed for non-WordPress sites, kiosks, and displays
✔ Works across multiple websites simultaneously
✔ Automatic timezone handling
✔ Zero data stored in WordPress (API-based, lightweight)
✔ End-user i18n built-in
✔ ICS and iCal support for calendar subscriptions
✔ Event alerts with optional countdown timers
✔ Social sharing & direct event links built in

= 🔧 How Revisual Works =

1. Connect your Google Calendar to Revisual.
2. Design your widget using the visual builder — no coding needed.
3. Connect your WordPress site.
4. Embed via block or shortcode.
5. Revisual keeps everything updated automatically across every channel.

= 🎨 Customization =

1. Pick from multiple layouts — list, grid, cards, slider, monthly view, schedule, and more.
2. Change colors, typography, and spacing to match your brand.
3. Configure behaviour and UX (filters, event details visibility, date formats).
4. Add logos and highlighted event styles to promote key events.
5. Customize hosted event pages or redirect them to your own destinations.

= 🎯 Perfect For =

Revisual is designed for anyone who runs events and wants their audience to always know what's happening — across every touchpoint.

* **Hotels & hospitality** — Communicate your events programme to guests before arrival, on-property, and after checkout. Turn your event calendar into a differentiator, not an afterthought.
* **Event creators** — Share events widely, drive attendees back to your website for details, registration, and updates.
* **Coaches, trainers & educators** — Promote classes, workshops, and webinars from a single calendar. Keep participants informed across email, your website, and social.
* **Non-profits & community organisations** — Keep members informed without manual work. One update reaches every channel automatically.
* **Clubs & associations** — Make meetings, sessions, and gatherings easy to discover and attend.
* **Creative professionals** — Showcase performances, exhibitions, and shows across multiple platforms. QR codes on printed materials stay live even after the programme changes.
* **Multi-site publishers & agencies** — Manage event communication across multiple client sites from one place, keeping every channel consistent and up to date.
* **Municipalities & cultural institutions** — Run city-wide or institution-wide event campaigns from a single shared calendar, reaching audiences across all your channels.

= 🔒 Performance & Security =

Revisual is designed to be fast, reliable, and secure. Your WordPress site never stores event data — all events are fetched via a secure API from your Revisual account. This keeps your site lightweight and ensures it won't be slowed down by event queries.

Embedding is simple: a tiny script or WordPress block pulls events dynamically without impacting your site's performance. Revisual handles caching on its side, so events load instantly for visitors.

All connections are encrypted. No visitor data is collected. No cookies are tracked.

= 🗺️ Roadmap =

We're actively developing new features, including:

* More calendar integrations
* Engagement metrics — see which events attract the most interest
* RSVP functionality


= 💡 Feature Requests =

Share feature ideas with us: [Revisual Help Center](https://help.revisual.io/en/)


== Installation ==

= Minimum Requirements =

* WordPress 6.2 or greater
* PHP version 7.2 or greater

= Installation =

1. Upload the plugin files to the `/wp-content/plugins/revisual` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the Settings → Revisual screen to configure the plugin.
4. Connect your WP site with your Revisual account.
5. Embed your widget using a shortcode or Gutenberg block.

== Support ==

You can find help desk articles and contact support at [Revisual Help Desk](https://help.revisual.io).


== External services ==

Revisual connects to the Revisual API to pull your event widgets and ensure seamless syncing between your WordPress site and your Revisual account.

Here's exactly what happens and why:

* Your WordPress site sends basic information to the Revisual API:
  - WordPress version
  - Site name
  - Site URL

* Purpose:
  - To generate a unique API key for your site
  - To securely fetch your event data and widgets from Revisual
  - To ensure your events are always up-to-date and display correctly

* Data privacy and security:
  - Revisual never shares your data with third parties
  - No cookies are tracked by Revisual
  - No personal or identifying information from site visitors is collected
  - Data is transmitted securely via encrypted API connections
  - Fully compliant with EU privacy regulations (GDPR)
  - Your WordPress site data is only used for connecting and syncing widgets

This setup allows Revisual to function as a lightweight, performance-friendly layer: events are served directly from Revisual servers, keeping your website fast while enabling sharing across multiple sites, emails, and other channels.

This service is provided by "Revisual": [Terms of Service](https://revisual.io/terms-of-service) and [Privacy Policy](https://revisual.io/privacy).


== Frequently Asked Questions ==

= Is this plugin free? =

YES! Revisual is completely free to use. You don't need a paid plan to get started — all essential features are included in the free plan.

= How does the plugin work exactly? =

Revisual does not store any event data on your WordPress site. It securely connects to your Revisual account and fetches events from there. Manage your events in Google Calendar, and they automatically update everywhere Revisual is embedded.

= Why does Revisual store data on its server instead of WordPress? =

All event data is stored on Revisual servers so that your events stay consistent across every channel — your website, partner sites, QR codes, and hosted pages — without any syncing issues or data duplication.

= Do I need the Revisual plugin to make it work? =

No. Revisual works independently. The WordPress plugin simply makes it easier to embed your events on WordPress sites via shortcodes or Gutenberg blocks. For non-WordPress sites, use the simple script embed.

= Can I customize the look of the widget? =

Yes. The Revisual widget builder gives you full control over colors, fonts, layouts, and branding — with over 250 built-in customization options. Most sites won't need any custom code.

= Can I embed widgets on multiple websites? =

Yes. You can embed your widgets on multiple pages, posts, and across different websites. All of them update automatically whenever you make a change in Google Calendar.

= Does Revisual slow down my site? =

No. Revisual is lightweight and only renders events on the front-end. Shortcodes or blocks convert into embeddable code without impacting WordPress performance, regardless of how many visitors you have.

= What calendars are supported besides Google Calendar? =

Google Calendar is fully supported. We welcome feedback and may add support for other calendar platforms based on user requests.

= Can I use Revisual for printed materials? =

Yes. Revisual generates QR codes that link directly to your live event listings. This means printed materials — flyers, posters, programmes — stay accurate even after events change, because the QR code always points to the live version.

= Can I customize the hosted event pages? =

Yes. Hosted event pages are fully customizable. You can also redirect them to your own URLs if needed.

= Does Revisual work with caching plugins? =

Revisual has its own built-in caching and does not require external caching. Using caching plugins may interfere with real-time event updates, so it is recommended to exclude Revisual from your caching plugin's rules.

= Is developer customization possible? =

Yes. Revisual outputs HTML + CSS, so developers can add custom styles as needed. With 250+ built-in options, most sites won't need extra code.

= How often does syncing happen? =

Events from Google Calendar are synced automatically — usually within seconds of a change being made.


== Screenshots ==

1. Calendar Template Builder - Preview your events in real-time while customizing layout, colors, fonts, and event styles using the design panel.
2. Event Details Modal - Click any event to see full details in a sleek modal. All content — title, description, time, location, and more — is controlled directly from Google Calendar.
3. Enhanced Event Features - View recurring event series with Google Places integration. Venue images, addresses, and navigation links are pulled automatically from your Google Calendar event data.
4. Easy Event Sharing - End users can share events via QR codes, social media, or direct links. All sharing options are generated automatically from your Google Calendar event details.
5. ICS / iCal Subscriptions - Allow visitors to subscribe to your events with ICS/iCal feeds. Events sync automatically to their personal calendars, always sourced from your Google Calendar.
6. Event Filters - Filter events by calendar, location, or tags. All filter options are controlled from your Google Calendar.
7. Event Alerts - Display upcoming events as banners with optional countdown timers, always synced from your Google Calendar.
8. WordPress Admin Dashboard - Clean, intuitive settings panel for configuring widgets, connecting calendars, and managing plugin options.
9. Gutenberg Block Preview - See your Revisual event widget live in the WordPress editor before publishing.


== Upgrade Notice ==

Revisual updates are fully backward compatible. There are no breaking changes in this release — you can safely update without affecting existing widgets or settings.


== Changelog ==

= 0.2.6 | 20, May 2026 =
* Testing with WordPress 7.0 and PHP 8.2

= 0.2.5 | 3, Dec 2025 =
* Testing with WordPress 6.9

= 0.2.4 | 25, Nov 2025 =
* Testing with latest WP
* Readme updates.

= 0.2.0 =
* Initial release of the Revisual plugin


== Source Code / Development ==

The source code for this plugin is available on GitHub:
https://github.com/revisual-app/wordpress-plugin
