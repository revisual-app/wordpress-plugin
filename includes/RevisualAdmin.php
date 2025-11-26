<?php

namespace Revisual;

class RevisualAdmin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'addPluginAdminMenu' ], 9 );
        add_action( 'admin_init', [ $this, 'registerAndBuildFields' ] );

        wp_enqueue_style(
            'revisual-admin-css',
            plugin_dir_url( REVISUAL_PLUGIN_SRC ) . "public/" . RevisualConfig::get( 'branding' ) . "/css/admin.css",
            [],
            RevisualConfig::get( 'version' )
        );


        wp_enqueue_style(
            'revisual-admin-settings-css',
            plugin_dir_url( REVISUAL_PLUGIN_SRC ) . "build/style-index.css",
            'revisual',
            RevisualConfig::get( 'version' )
        );
//
//		wp_enqueue_script(
//			'gutenberg-preview',
//			"/wp-content/plugins/revisual/public/js/admin-gutenberg.js",
//			[],
//			[],
//			['in_footer' => true]
//		);

        add_action( 'admin_enqueue_scripts', [ $this, "enqueueSettingsPageScript" ] );


        register_activation_hook( REVISUAL_PLUGIN_SRC, [ RevisualPluginStateManagement::class, "activate" ] );
        register_deactivation_hook( REVISUAL_PLUGIN_SRC, [ RevisualPluginStateManagement::class, "deactivate" ] );
        register_uninstall_hook( REVISUAL_PLUGIN_SRC, [ RevisualPluginStateManagement::class, "uninstall" ] );

        $this->registerAPIListener();

        add_action('current_screen', [$this, 'checkForInterferingPlugins']);

    }


    public function addPluginAdminMenu() {

        add_menu_page(
            'Revisual',
            'Revisual',
            'manage_options',
            'revisual',
            [ $this, 'adminPage' ],
            "/wp-content/plugins/revisual/public/" . RevisualConfig::get( 'branding' ) . "/img/icon.png",
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
        add_action( 'enqueue_block_assets', function(): void {
            wp_enqueue_style( 'dashicons' );
        } );
//    register_setting('revisual_options_group', 'revisual_options');
//    add_settings_section('revisual_options_section', 'Revisual Options', array( $this, 'revisualOptionsSection' ), 'revisual');
//    add_settings_field('revisual_options_field', 'Revisual Options', array( $this, 'revisualOptionsField' ), 'revisual', 'revisual_options_section');
    }


    /**
     * @param string $admin_page
     */
    public function enqueueSettingsPageScript( $admin_page ) {
        if ( 'toplevel_page_revisual' !== $admin_page ) {
            return;
        }

        $asset_file = REVISUAL_PLUGIN_PATH . 'build/index.asset.php';
        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = include $asset_file;

        wp_enqueue_script(
            'revisual',
            plugins_url( 'build/index.js', REVISUAL_PLUGIN_SRC ),
            $asset['dependencies'],
            $asset['version'],
            [
                'in_footer' => true,
            ]
        );

        wp_enqueue_style( 'wp-components' );

    }


    private function registerAPIListener() {
        $requestMethod = ! empty( $_SERVER['REQUEST_METHOD'] )
            ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) )
            : "GET";

        $nonce = ! empty( $_GET['_wpnonce'] )
            ? sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) )
            : "";

        $page = ! empty( $_GET['page'] )
            ? sanitize_text_field( wp_unslash( $_GET['page'] ) )
            : "";

        if ( $requestMethod === 'GET'
             && $page === 'revisual'
             && wp_verify_nonce( $nonce, 'revisual' ) ) {

            // Extract and sanitize only the necessary parameters
            $allowedParams = [
                'page'     => $page,
                '_wpnonce' => $nonce,
                'api_key'  => isset( $_GET['api_key'] ) ? sanitize_text_field( wp_unslash( $_GET['api_key'] ) ) : '',
                'revoke'   => isset( $_GET['revoke'] ) ? rest_sanitize_boolean( $_GET['revoke'] ) : false,
            ];


            $listener = new RevisualGetListener( $allowedParams );
            do_action( 'onchangeapi', $listener->invoke() );
        }
    }


    public function checkForInterferingPlugins() {
        // check for cache plugins enabled
        $screen = \get_current_screen();

        // Make sure the notice only appears on *your* plugin’s page
        if ( $screen->id !== 'toplevel_page_revisual' ) {
            return;
        }

        $activeCachePlugins = $this->getWPActiveCachePlugins();

        // this is to show the warning only if they didn't connect with Revisual yet
        $revApiKey = RevisualOption::getValue('RevApiKey');

        if ( ! empty( $activeCachePlugins ) && empty($revApiKey)) {
            add_action( 'admin_notices', function() use ($activeCachePlugins) {


                echo '<div class="notice notice-warning"><p>';
                echo 'Warning: The following cache plugins are active and may prevent Revisual connection settings from updating properly: ';
                echo '<strong>' . implode( ', ', $activeCachePlugins ) . '</strong>.';
                echo ' Please clear their caches or temporarily disable caching during Connecting with Revisual.';
                echo '</p></div>';
            } );
        }
    }


    private function getWPActiveCachePlugins() {
        include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

        $cache_plugins = [
            'litecache/litecache.php'             => 'LiteCache',
            'litespeed-cache/litespeed-cache.php' => 'LiteSpeed Cache',
            'wp-super-cache/wp-cache.php'         => 'WP Super Cache',
            'w3-total-cache/w3-total-cache.php'   => 'W3 Total Cache',
            'wp-fastest-cache/wpFastestCache.php' => 'WP Fastest Cache',
            'cache-enabler/cache-enabler.php'     => 'Cache Enabler',
        ];

        $active = [];

        foreach ( $cache_plugins as $file => $name ) {
            if ( is_plugin_active( $file ) ) {
                $active[] = $name;
            }
        }

        return $active;
    }

}
