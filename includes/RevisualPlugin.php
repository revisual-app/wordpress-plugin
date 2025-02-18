<?php

namespace Revisual;

//use function Revisual\add_action;
//use function Revisual\wp_enqueue_script;

class RevisualPlugin {


	public function __construct() {

		RevisualConfig::load();


		$this->initializeScripts();

		$this->initializeShortCodes();

		new RevisualAdmin();
		new RevisualAPI();
		new RevisualBlockEditor();

	}


	private function initializeScripts() {

		add_action('wp_enqueue_scripts', [$this, 'addLoaderScript']);
//    add_action('admin_enqueue_scripts', [$this, 'addLoaderScriptAdmin']);
	}

	/**
	 * @return void
	 */
	public function addLoaderScript(): void {

		/**
		 * Loader script is responsible for determining the embedded widget on the web page and loading the appropriate widget script.
		 * The Widget script itinializes the widget and renders it.
		 */
		wp_enqueue_script(
			'dce-embeddable-script',
			RevisualConfig::get('loaderScriptUrl'),
			[],
			RevisualConfig::get('loaderScriptVersion'),
			[
				'strategy' => 'async'
			]);

		/**
		 * Event alerts are unique as they don't need a DOM object. They are appended directly to body and are used to alert the user of certain events.
		 */
		wp_enqueue_script(
			'dc-alerts-script',
			RevisualConfig::get('alertsScriptUrl'),
			[],
			RevisualConfig::get('loaderScriptVersion'),
			[
				'strategy' => 'async'
			]);
	}


	/**
	 * @param string $hook
	 *
	 * @return void
	 */
	public function addLoaderScriptAdmin(string $hook): void {

		if (!in_array($hook, ['edit.php', 'post.php', 'post-new.php'])) {
			return;
		}
		$this->addLoaderScript();
	}


	/**
	 * @return void
	 */
	private function initializeShortCodes() {
		add_shortcode('revisual', [$this, 'revShortCode']);
	}

	/**
	 * @param array $atts
	 *
	 * @return string
	 */
	public function revShortCode($atts): string {

		ob_start();

		$widgetId   = $atts['id'];
		$widgetType = $atts['type'];
		$template   = $atts['template'];
		$iframe     = $atts['iframe'];

		include REV_REV_PLUGIN_SRC . '/views/shortcode.php';

		return ob_get_clean();
	}


}
