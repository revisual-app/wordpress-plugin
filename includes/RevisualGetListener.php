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
			update_option(RevisualOption::getName('RevApiKey'), $this->data['api_key']);
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


		return true;

	}
}
