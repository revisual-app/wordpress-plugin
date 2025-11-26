=== Revisual ===
Contributors:      piotrpoz, revisual
Tags:              google, calendar, events, revisual, embed
Tested up to:      6.8
Stable tag:        0.2.3
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 6.2

The ultimate Google Calendar display plugin for WordPress. Revisual transforms your calendar into elegant, shareable event widgets that drive traffic and look great on any site.


== Description ==

Revisual turns your Google Calendar into beautiful, shareable event widgets. Display your events on WordPress with shortcodes, Gutenberg blocks, or anywhere via link or QR code. Updates happen automatically, so your events are always fresh.

Customize layouts, highlight key events, and promote beyond your website with hosted pages. Simple setup, no coding — just sync, embed, and shine.

= ✨ Features =

Revisual is packed with everything you need to showcase, manage, and share your events seamlessly, making it effortless to keep your audience up-to-date with beautifully designed, interactive event widgets.

✔ Sync with Google Calendar & other calendar sources
✔ Automatic real-time updates
✔ Unlimited event widgets
✔ Gutenberg block + shortcode embedding
✔ Fully customizable widget builder
✔ QR codes & hosted event pages
✔ Multiple widget layouts (list, grid, schedule, cards, etc.)
✔ Event highlighting & branding options
✔ Simple script embed (non-WordPress sites too)
✔ Works across multiple websites
✔ Automatic timezone handling
✔ Zero data stored in WordPress (API-based, lightweight)
✔ End-user i18n built-in
✔ ICS and iCal support


= 🎯 Perfect for =

Revisual is designed to make event management effortless for anyone who wants to showcase, share, and promote events across multiple platforms — while driving more visitors to your website.

Whether it’s embedded on your site, shared via QR codes, or sent in emails, Revisual ensures your audience can always access your latest events.

* Event creators – Share events widely outside your site, while encouraging attendees to visit your website for more details and updates.
* Coaches, trainers, educators – Promote classes, workshops, and webinars anywhere — from emails to social media — and bring participants to your website to learn more or register.
* Non-profits & community organizations – Keep members informed with events that can be shared externally, while boosting website traffic for announcements, sign-ups, and resources.
* Clubs – Make your services, meetings, or gatherings easy to discover anywhere, while ensuring your website becomes the central hub for full event details.
* Creative professionals – Showcase performances, exhibitions, or shows on multiple platforms, and draw attendees back to your website for tickets, galleries, and updates.
* Multi-platform publishers – Embed calendars on websites, kiosks, emails, and social media, while encouraging viewers to visit your website for the complete experience.
* Agencies managing multiple client sites – Effortlessly share events across channels for all clients, while directing traffic back to each client’s website for engagement and conversions.

= 🌐 Events Everywhere =

Revisual gives your events a second life. They’re not limited to your website — share them across any channel, from emails to kiosks, while keeping them instantly accessible. Acting as a lightweight cache layer, Revisual ensures your events load fast without slowing down your site, letting you reach your audience everywhere, effortlessly.

= 🔧 How Revisual Works =

1. Create or sync your calendar inside Revisual.
2. Design your widget using the visual builder.
3. Connect your WordPress site.
4. Embed via block or shortcode.
5. Revisual keeps your site automatically updated.


= 🎨 Customization =

1. Pick from multiple layouts.
2. Change colors, typography, spacing.
3. Configure the behaviour and UX.
4. Add logos and highlighted event styles.
5. Control event detail visibility
6. Customize date formats


== Installation ==

= Minimum Requirements =

* WordPress 6.2 or greater
* PHP version 7.2 or greater

= Installation =

1. Upload the plugin files to the `/wp-content/plugins/revisual` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the Settings → Revisual screen to configure the plugin.
4. Connect you WP page with Revisual account.
5. Embed your widget using shortcode or Gutenberg block.

== Support ==
You can find help desk articles and contact support at [Revisual Help Desk](https://help.revisual.io).


== External services ==

Revisual connects to the Revisual API to pull your event widgets and ensure seamless syncing between your WordPress site and your Revisual account.

Here’s exactly what happens and why:

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

= 🔒 Performance & Security =

Revisual is designed to be fast, reliable, and secure. Your WordPress site never stores event data — all events are fetched via a secure API from your Revisual account. This keeps your site lightweight and ensures it won’t be slowed down by event queries.

Embedding is simple: a tiny script or WordPress block pulls events dynamically, without impacting your site’s performance. Revisual also handles caching on its side, so events load instantly for visitors.

All connections are encrypted and safe, giving you peace of mind while sharing your events across multiple platforms and websites.

= 🗺️ Roadmap =

We’re actively developing new features, including:

* More calendar integrations
* Light-weight stats and engagement metrics
* RSVP


= 💡 Feature Requests =

Share feature ideas with us: [Revisual Help Center](https://help.revisual.io/en/)

== Frequently Asked Questions ==

= Is this plugin free? =

YES! Revisual is completely free to use. You don’t need a paid plan to get started — all essential features are included in the free plan.

= How does the plugin work exactly? =

Revisual does not store any event data on your WordPress site. It securely connects to your Revisual account and fetches events from there. Manage your events in Revisual, and they automatically update on your website.

= Why does Revisual store data on its server instead of WordPress? =

All event data is stored on Revisual servers to ensure events are always up-to-date. This allows you to share events across multiple websites and platforms without syncing issues or data duplication.

= Do I need the Revisual plugin to make it work? =

No. Revisual works independently. The WordPress plugin simply makes it easier to embed your events on your site via shortcodes or Gutenberg blocks.

= Can I customize the look of the widget? =

Yes! The Revisual widget builder lets you fully customize colors, fonts, layouts, and branding to match your site and style.

= Can I embed widgets on multiple websites? =

Yes, you can embed widgets on multiple pages, posts, and even on different websites.

= Does Revisual slow down my site? =

No. Revisual is lightweight and only renders events on the front-end. Shortcodes or blocks convert into embeddable code without impacting WordPress performance, no matter how many visitors you have.

= What calendars are supported besides Google Calendar? =

Currently, Google Calendar is fully supported. We welcome feedback and may add support for other calendar platforms based on user requests.

= Can I customize the hosted event pages? =

Yes. Hosted event pages are customizable, and you can also redirect them to other destinations if needed.

= Does Revisual work with caching plugins? =

Revisual has its own built-in caching and does not require external caching. Using caching plugins may interfere with event updates, so it is recommended to disable caching for Revisual.

= Is developer customization possible? =

Yes. Revisual outputs HTML+CSS, allowing developers to add custom styles if needed. With over 250+ built-in customization options, most sites won’t need extra code.

= How often does syncing happen? =

Events from Google Calendar are synced automatically, usually seconds after changes are made.

== Screenshots ==

1. Calendar Template Builder - Preview your events in real-time while customizing layout, colors, fonts, and event styles using the design panel.
2. Event Details Modal - Click any event to see all its details in a sleek modal. All content — title, description, time, location, and more — is fully controlled from your Google Calendar, while the URL updates seamlessly thanks to Revisual's SPA layer.
3. Enhanced Event Features - View recurring event series, complete with Google Places integration. Venue images, address, and navigation links are automatically pulled from your Google Calendar event details.
4. Easy Event Sharing - End users can quickly share events via QR codes, social media, or direct links. All sharing options are generated automatically from your Google Calendar event details, making promotion effortless and consistent.
5. ICS / iCal Subscriptions - Allow users to subscribe to your events using ICS/iCal feeds. Events automatically sync with their calendars, keeping them up to date without manual updates, all sourced directly from your Google Calendar.
6. Event Filters - Easily filter events in your widget by calendar, location, or tags. All filtering options are fully controlled from your Google Calendar, giving you flexible and dynamic views for your visitors.
7. Event Alerts Preview - Display events as banners on your website with optional countdown timers. Event details and timing are fully synced from Google Calendar, keeping alerts always up to date.
8. WordPress Admin Dashboard - Revisual plugin settings and calendar management interface. Easily configure your widgets, connect calendars, and manage global plugin options from a clean, intuitive dashboard.
9. Gutenberg Block Preview - See your Revisual event widget directly in the WordPress page editor. Make adjustments and view live previews before publishing.


== Upgrade Notice ==

Revisual updates are fully backward compatible. There are no breaking changes in this release, so you can safely update without affecting existing widgets or settings.


== Changelog ==

= 0.2.6 | 25, Nov 2025 =
* Testing with latest WP
* Readme updates.

= 0.2.0 =
* Initial release of the Revisual plugin

== Source Code / Development ==
The source code for this plugin is available on GitHub. You can review the source code and contribute to the project at the following link:
https://github.com/revisual-app/wordpress-plugin
