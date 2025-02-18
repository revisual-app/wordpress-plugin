<?php

namespace Revisual;

define('REVISUAL_FIELD_PREFIX', substr(md5('revisual_filed_prefix'), 0, 8));

class RevisualOption {


	/**
	 * Reads the option field value considering the prefix
	 *
	 * @param string $key
	 *
	 * @return false|mixed|null
	 */
	public static function getValue($key) {

		$fieldName = self::fieldName($key);

		return get_option($fieldName);
	}


	/**
	 * @param string $key
	 *
	 * @return string
	 */
	public static function getName($key) {

		return self::fieldName($key);

	}

	/**
	 * @param string $name
	 *
	 * @return string
	 */
	private static function fieldName($name) {

		return REVISUAL_FIELD_PREFIX . '_' . $name;
	}
}

