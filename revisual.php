<?php
/**
 * Plugin Name:       Revisual
 * Plugin URI:        https://revisual.io/?utm_source=wp-plugin&utm_medium=plugin-page&utm_campaign=wp-plugin
 * Description:       Seamlessly integrate Revisual event widgets into your WordPress site. Connect your Revisual account to access and embed your event calendars or alerts using shortcodes or the Gutenberg Block Editor.
 * Requires at least: 6.2
 * Requires PHP:      7.2
 * Version:           0.2.0
 * Author:            Revisual
 * Author URI         https://revisual.io/?utm_source=wp-plugin&utm_medium=plugin-page&utm_campaign=wp-plugin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       revisual
 * Network:           true
 *
 * @package Revisual
 * Revisual is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Elementor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

// Change header with: https://developer.wordpress.org/plugins/plugin-basics/header-requirements/ options

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}


if (!version_compare(PHP_VERSION, '7.2', '>=')) {
	add_action('admin_notices', '__revisual_fail_php_version');
} elseif (!version_compare(get_bloginfo('version'), '6.2', '>=')) {
	add_action('admin_notices', '__revisual_fail_wp_version');
} else {

	/**
	 * paths definitions
	 */
	define("REVISUAL_PLUGIN_PATH", plugin_dir_path(__FILE__));
	define("REVISUAL_PLUGIN_SRC", REVISUAL_PLUGIN_PATH . "includes");

	require 'vendor/autoload.php';


	function runRevisualPlugin() {
		new Revisual\RevisualPlugin();
	}

	add_action('wp_loaded', function() {
		runRevisualPlugin();
	});

}

/**
 * @return void
 */
function __revisual_fail_php_version() {
	$html_message = sprintf(
		'<div class="error"><h3>%1$s</h3><p>%2$s </p></div>',
		esc_html__("Revisual isn't running because PHP is outdated.", 'revisual'),
		sprintf(
		/* translators: %s: PHP version. */
			esc_html__('Update to version %s to make Revisual work.', 'revisual'),
			'7.4'
		)
	);

	echo wp_kses_post($html_message);
}

/**
 * @return void
 */
function __revisual_fail_wp_version() {
	$html_message = sprintf(
		'<div class="error"><h3>%1$s</h3><p>%2$s</p></div>',
		esc_html__("Revisual isn't running because WordPress is outdated.", 'elementor'),
		sprintf(
		/* translators: %s: WordPress version. */
			esc_html__('Update to version %s to make Revisual work', 'elementor'),
			'6.3'
		)
	);

	echo wp_kses_post($html_message);
}
