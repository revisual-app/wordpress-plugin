<?php

namespace Revisual;

class RevisualAuthentication {

	public static function getAuthRequestUrl(): string {


		$params = [
			"type"       => "wp",
			"url"        => get_bloginfo("url"),
			"sitename"   => get_bloginfo("name"),
			"adminemail" => get_bloginfo("admin_email"),
			"version"    => get_bloginfo("version"),
			"callback"   => wp_nonce_url(get_bloginfo("url") . "/wp-admin/admin.php?page=revisual"),
		];


		return RevisualConfig::get('authUrl') . '?' . http_build_query($params);

	}


	/**
	 *
	 * @return string
	 */
	public static function getRevokeRequestUrl(): string {
		$params = [
			"type"       => "wp",
			"url"        => get_bloginfo("url"),
			"sitename"   => get_bloginfo("name"),
			"adminemail" => get_bloginfo("admin_email"),
			"version"    => get_bloginfo("version"),
			"callback"   => wp_nonce_url(get_bloginfo("url") . "/wp-admin/admin.php?page=revisual"),
		];

		return RevisualConfig::get('discardTokenUrl') . '?' . http_build_query($params);
	}
	

}
