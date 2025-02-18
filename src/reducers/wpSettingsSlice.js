import { createSlice } from "@reduxjs/toolkit";
import { fetchWPSettings } from "../actions/wpSettings";
import { disconnectPlugin } from "../actions/settingsApp";

const initialState = {
	fetch: false,
	fetchSuccess: false,
	fetchError: null,

	revokeTokenUrlFetch: false,
	revokeTokenUrlFetchSuccess: false,
	revokeTokenUrlFetchError: null,
	revokeTokenUrl: null,

	model: {
		apiKey: null,
		callbackUrl: "",
		version: "",
		adminEmail: "",
		pageTitle: "",
		pageUrl: "",
	},
};

export const wpSettingsSlice = createSlice({
	name: "wpSettings",

	initialState: {
		...initialState,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWPSettings.pending, (state, action) => {
				state.fetch = true;
				state.fetchSuccess = false;
				state.fetchError = false;
			})
			.addCase(fetchWPSettings.fulfilled, (state, action) => {
				state.fetch = false;
				state.fetchSuccess = true;
				state.model = {
					...action.payload,
					apiKey: action.payload?.RevApiKey,
				};
			})
			.addCase(fetchWPSettings.rejected, (state, action) => {
				state.fetch = false;
				state.fetchError = action.payload;
			})
			.addCase(disconnectPlugin.pending, (state, action) => {
				state.revokeTokenUrlFetch = true;
				state.revokeTokenUrlFetchSuccess = false;
				state.revokeTokenUrlFetchError = false;
			})
			.addCase(disconnectPlugin.fulfilled, (state, action) => {
				state.revokeTokenUrlFetch = false;
				state.revokeTokenUrlFetchSuccess = true;
				state.revokeTokenUrl = action.payload.requestUrl;
			})
			.addCase(disconnectPlugin.rejected, (state, action) => {
				state.revokeTokenUrlFetch = false;
				state.revokeTokenUrlFetchError = action.error;
			});
	},
});

export const WPSettings = (state) => state.wpSettings;
export default wpSettingsSlice.reducer;
