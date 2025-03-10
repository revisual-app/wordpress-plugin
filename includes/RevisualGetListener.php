<?php

namespace Revisual;

class RevisualGetListener {
	private $valid = false;

	private $data = [];

	/**
	 * @param array $getData $_GET array
	 */
	public function __construct(array $getData) {
		$this->valid = $this->validatePostData($getData);
		$this->data  = $getData;
	}

	/**
	 * Runs on 'onchangeapi' action
	 */
	public function invoke(): void {

		if (!$this->valid) {
			return;
		}

		if (isset($this->data['api_key'])) {
			$apiKey = filter_var($this->data['api_key'], FILTER_SANITIZE_STRING);
			update_option(RevisualOption::getName('RevApiKey'), $apiKey);
		} else if (isset($this->data['revoke'])) {
			update_option(RevisualOption::getName('RevApiKey'), null);
		}

		wp_redirect(admin_url('admin.php?page=revisual'));

	}

	/**
	 * @param array $getData $_GET array
	 *
	 * @return bool
	 */
	private function validatePostData(array $getData): bool {

		if (empty($getData['page']) || $getData['page'] !== 'revisual') {
			return false;
		}

		if (empty($getData['_wpnonce'])) {
			return false;
		}

		if (empty($getData['api_key']) && empty($getData['revoke'])) {
			return false;
		}

		if (!empty($getData['api_key'])) {
			if (!preg_match('/^\$2[aby]\$\d{2}\$[A-Za-z0-9\/\.]{53}$/', $getData['api_key'])) {
				return false;
			}
		}


		return true;

	}
}
