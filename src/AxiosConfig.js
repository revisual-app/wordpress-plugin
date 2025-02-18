/**
 * Created by piotr.pozniak@thebeaverhead.com on 20/08/2018.
 */

export default class AxiosConfig {
	static apiKey = null;

	static _config = {
		baseURL: "http://localhost:81", //process.env.API_ADDRESS,
		headers: {
			Accept: "application/json, text/javascript, /; q=0.01",
			"Content-Type": "application/json",
			"X-Location-Path": window.location.pathname,
		},
	};

	static endpointAddress = "http://localhost:81/api4"; //process.env.API_ADDRESS;

	/**
	 *
	 * @param token
	 */
	static setApiKey(_apiKey) {
		AxiosConfig.apiKey = _apiKey;
	}

	/**
	 *
	 * @returns {string}
	 */
	static getApiKey() {
		return AxiosConfig.apiKey;
	}

	/**
	 *
	 * @returns {object}
	 */
	static getConfig() {
		return AxiosConfig._config;
	}

	/**
	 *
	 * @returns {object}
	 */
	static getAuthConfig() {
		return {
			...AxiosConfig._config,
			headers: {
				...AxiosConfig._config.headers,
				"Api-key": AxiosConfig.apiKey,
			},
		};
	}

	/**
	 *
	 * @returns {*}
	 */
	static getAuthConfigIfAvailable() {
		if (AxiosConfig.apiKey) {
			return AxiosConfig.getAuthConfig();
		}

		return AxiosConfig.getConfig();
	}

	/**
	 *
	 */
	static getEndpointAddress() {
		return AxiosConfig.endpointAddress;
	}

	/**
	 *
	 * @param params
	 */
	static objectToURLQuery(params = {}) {
		return Object.keys(params)
			.filter((i) => params[i])
			.map((key) => key + "=" + params[key])
			.join("&");
	}
}
