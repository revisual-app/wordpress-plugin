<?php
namespace Revisual;

	if (!current_user_can('manage_options')) {
		wp_die('You do not have sufficient permissions to access this page.');
	}
?>
<div class="_rev--card" id ="_rev--settings-page"></div>
