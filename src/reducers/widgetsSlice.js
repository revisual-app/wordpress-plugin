import { createSlice } from "@reduxjs/toolkit";
import { fetchWidgets } from "../actions/widgets";
import { disconnectPlugin } from "../actions/settingsApp";

const initialState = {
	fetch: false,
	fetchSuccess: false,
	fetchError: null,

	collection: [],
};

export const widgetsSlice = createSlice({
	name: "widgets",

	initialState: {
		...initialState,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWidgets.pending, (state, action) => {
				state.fetch = true;
				state.fetchSuccess = false;
				state.fetchError = false;
			})
			.addCase(fetchWidgets.fulfilled, (state, action) => {
				state.fetch = false;
				state.fetchSuccess = true;
				state.collection = action.payload || [];
			})
			.addCase(fetchWidgets.rejected, (state, action) => {
				state.fetch = false;
				state.fetchError = action.payload;
			});
		// .addCase(disconnectPlugin.fulfilled, (state, action) => {
		// 	state.fetch = false;
		// 	state.fetchSuccess = false;
		// 	state.collection = [];
		// });
	},
});

export const widgets = (state) => state.widgets;
export default widgetsSlice.reducer;
