import { createSlice } from "@reduxjs/toolkit";
import { fetchOrgInfo } from "../actions/orgInfo";
import { disconnectPlugin } from "../actions/settingsApp";

const initialState = {
	fetch: false,
	fetchSuccess: false,
	fetchError: null,

	model: {
		name: "",
		uuid: "",
		logoUrl: "",
	},
};

export const orgInfoSlice = createSlice({
	name: "orgInfo",

	initialState: {
		...initialState,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrgInfo.pending, (state, action) => {
				state.fetch = true;
				state.fetchSuccess = false;
				state.fetchError = false;
			})
			.addCase(fetchOrgInfo.fulfilled, (state, action) => {
				state.fetch = false;
				state.fetchSuccess = true;
				state.model = action.payload;
			})
			.addCase(fetchOrgInfo.rejected, (state, action) => {
				state.fetch = false;
				state.fetchError = action.payload;
			});
		// .addCase(disconnectPlugin.fulfilled, (state, action) => {
		// 	state.fetch = false;
		// 	state.fetchSuccess = false;
		// 	state.model = initialState.model;
		// });
	},
});

export const orgInfo = (state) => state.orgInfo;
export default orgInfoSlice.reducer;
