import apiFetch from "@wordpress/api-fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Fetches the WordPress settings.
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchWPSettings = createAsyncThunk(
	"wpSettings/fetch",
	async (_, { rejectWithValue }) => {
		// return await apiFetch({ path: "/revisual/v1/settings" });
		try {
			return await apiFetch({ path: "/revisual/v1/settings" });
		} catch (e) {
			console.error("REVISUAL: Error reading /revisual/v1/settings", e);
			throw rejectWithValue({
				message: e.message || "Error fetching WordPress settings",
				data: e.data || null,
				code: e.code || null,
			});
		}
	}
);
