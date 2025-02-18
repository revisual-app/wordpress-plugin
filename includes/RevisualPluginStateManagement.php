<?php

namespace Revisual;

class RevisualPluginStateManagement {
	public static function activate() {
		add_option(RevisualOption::getName('RevApiKey'), '');
	}

	public static function deactivate() {
		update_option(RevisualOption::getName('RevApiKey'), '');
	}


	public static function uninstall() {
		delete_option(RevisualOption::getName('RevApiKey'));
	}
}
