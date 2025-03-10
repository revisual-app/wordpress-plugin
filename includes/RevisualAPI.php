<?php

namespace Revisual;

class RevisualAPI {

	public function __construct() {
		add_action('rest_api_init', [$this, "registerRestRoutes"]);
	}


	/**
	 * @return void
	 */
	public static function registerRestRoutes() {

		// register_rest_route() handles more arguments but we are going to stick to the basics for now.

		register_rest_route('revisual/v1', '/disconnect', array(
			// By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
			'methods'             => \WP_REST_Server::EDITABLE,
			// Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
			'callback'            => [RevisualAPI::class, "disconnect"],
			'permission_callback' => function() {
				return current_user_can('manage_options');
			}
		));

		register_rest_route('revisual/v1', '/settings', array(
			// By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
			'methods'             => \WP_REST_Server::READABLE,
			// Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
			'callback'            => [RevisualAPI::class, "settings"],
			'permission_callback' => function() {
				return current_user_can('manage_options');
			}
		));
	}


	/**
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public static function settings() {


		return rest_ensure_response(
			[
				'callbackUrl' => wp_nonce_url(get_bloginfo("url") . "/wp-content/plugins/revisual/auth.php"),
				'RevApiKey'   => RevisualOption::getValue('RevApiKey'),
				'version'     => get_bloginfo("version"),
				'authUrl'     => RevisualAuthentication::getAuthRequestUrl(),
				'adminEmail'  => get_bloginfo("admin_email"),
				'pageTitle'   => get_bloginfo("title"),
				'pageUrl'     => get_bloginfo("url"),
			]
		);

	}


	/**
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public static function disconnect() {


		return rest_ensure_response(['requestUrl' => RevisualAuthentication::getRevokeRequestUrl()]);

	}


}
