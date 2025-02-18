import apiFetch from "@wordpress/api-fetch";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const disconnectPlugin = createAsyncThunk(
	"settingsApp/disconnectPlugin",
	async () => {
		return await apiFetch({ path: "/revisual/v1/disconnect", method: "POST" });
	},
);
