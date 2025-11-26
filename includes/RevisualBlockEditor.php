<?php

namespace Revisual;

class RevisualBlockEditor {


	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function __construct() {
		register_block_type(REVISUAL_PLUGIN_PATH . '/build');
	}


}
