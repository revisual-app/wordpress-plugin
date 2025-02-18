<?php

namespace Revisual;

class RevisualConfig {

	/** @var array */
	private static $config;

	public static function load() {

		include __DIR__ . '/../config/plugin.php';
		self::$config = $__REV_CONFIG;

	}

	public static function get( $key ) {

		return self::$config[ $key ];
	}
}
