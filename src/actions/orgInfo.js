import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosConfig from "../AxiosConfig";
import formatAxiosError from "./errorFormatter";

/**
 * Fetches the org info
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchOrgInfo = createAsyncThunk(
	"orgInfo/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const url = AxiosConfig.getEndpointAddress() + "/public/org_info.json";
			const info = await axios.get(url, AxiosConfig.getAuthConfig());

			return info.data;
		} catch (e) {
			console.error(
				`REVISUAL: Error reading ${AxiosConfig.getEndpointAddress()}/public/org_info.json`,
				e
			);

			// handle invalid token
			if (e.response?.status === 401) {
				throw rejectWithValue({
					message: "Invalid token",
					code: 401,
				});
			}

			throw rejectWithValue(
				formatAxiosError(e, "Error fetching Organization info from Revisual")
			);
		}
	}
);
