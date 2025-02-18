import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosConfig from "../AxiosConfig";
import formatAxiosError from "./errorFormatter";

/**
 * Fetches the org info
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchWidgets = createAsyncThunk(
	"widgets/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const url = AxiosConfig.getEndpointAddress() + "/public/widgets.json";
			const widgets = await axios.get(url, AxiosConfig.getAuthConfig());

			return widgets.data;
		} catch (e) {
			console.error(
				`REVISUAL: Error fetching widgets ${AxiosConfig.getEndpointAddress()}/public/widgets.json`,
				e
			);
			throw rejectWithValue(formatAxiosError(e, "Error fetching widgets"));
		}
	}
);
