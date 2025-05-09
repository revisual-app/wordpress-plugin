<?php

namespace Revisual;

class RevisualAdmin {

	public function __construct() {
		add_action('admin_menu', [$this, 'addPluginAdminMenu'], 9);
		add_action('admin_init', [$this, 'registerAndBuildFields']);

		wp_enqueue_style(
			'revisual-admin-css',
			plugin_dir_url(REVISUAL_PLUGIN_SRC) . "public/" . RevisualConfig::get('branding') . "/css/admin.css",
			[],
			RevisualConfig::get('version')
		);


		wp_enqueue_style(
			'revisual-admin-settings-css',
			plugin_dir_url(REVISUAL_PLUGIN_SRC) . "build/style-index.css",
			'revisual',
			RevisualConfig::get('version')
		);
//
//		wp_enqueue_script(
//			'gutenberg-preview',
//			"/wp-content/plugins/revisual/public/js/admin-gutenberg.js",
//			[],
//			[],
//			['in_footer' => true]
//		);

		add_action('admin_enqueue_scripts', [$this, "enqueueSettingsPageScript"]);


		register_activation_hook(REVISUAL_PLUGIN_SRC, [RevisualPluginStateManagement::class, "activate"]);
		register_deactivation_hook(REVISUAL_PLUGIN_SRC, [RevisualPluginStateManagement::class, "deactivate"]);
		register_uninstall_hook(REVISUAL_PLUGIN_SRC, [RevisualPluginStateManagement::class, "uninstall"]);

		$this->registerAPIListener();

	}


	public function addPluginAdminMenu() {

		add_menu_page(
			'Revisual',
			'Revisual',
			'manage_options',
			'revisual',
			[$this, 'adminPage'],
			"/wp-content/plugins/revisual/public/" . RevisualConfig::get('branding') . "/img/icon.png",
			66
		);
	}


	/**
	 * @return void
	 */
	public function adminPage() {
		include REVISUAL_PLUGIN_SRC . '/views/panel/admin_page.php';
	}

	/**
	 * @return void
	 */
	public function registerAndBuildFields() {
		add_action('enqueue_block_assets', function(): void {
			wp_enqueue_style('dashicons');
		});
//    register_setting('revisual_options_group', 'revisual_options');
//    add_settings_section('revisual_options_section', 'Revisual Options', array( $this, 'revisualOptionsSection' ), 'revisual');
//    add_settings_field('revisual_options_field', 'Revisual Options', array( $this, 'revisualOptionsField' ), 'revisual', 'revisual_options_section');
	}


	/**
	 * @param string $admin_page
	 */
	public function enqueueSettingsPageScript($admin_page) {
		if ('toplevel_page_revisual' !== $admin_page) {
			return;
		}

		$asset_file = REVISUAL_PLUGIN_PATH . 'build/index.asset.php';
		if (!file_exists($asset_file)) {
			return;
		}

		$asset = include $asset_file;

		wp_enqueue_script(
			'revisual',
			plugins_url('build/index.js', REVISUAL_PLUGIN_SRC),
			$asset['dependencies'],
			$asset['version'],
			[
				'in_footer' => true,
			]
		);

		wp_enqueue_style('wp-components');

	}


	private function registerAPIListener() {
		$requestMethod = !empty($_SERVER['REQUEST_METHOD'])
			? sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD']))
			: "GET";

		$nonce = !empty($_GET['_wpnonce'])
			? sanitize_text_field(wp_unslash($_GET['_wpnonce']))
			: "";

		$page = !empty($_GET['page'])
			? sanitize_text_field(wp_unslash($_GET['page']))
			: "";

		if ($requestMethod === 'GET'
		    && $page === 'revisual'
		    && wp_verify_nonce($nonce, 'revisual')) {

			// Extract and sanitize only the necessary parameters
			$allowedParams = [
				'page'     => $page,
				'_wpnonce' => $nonce,
				'api_key'  => isset($_GET['api_key']) ? sanitize_text_field(wp_unslash($_GET['api_key'])) : '',
				'revoke'   => isset($_GET['revoke']) ? rest_sanitize_boolean($_GET['revoke']) : false,
			];


			$listener = new RevisualGetListener($allowedParams);
			do_action('onchangeapi', $listener->invoke());
		}
	}
}
