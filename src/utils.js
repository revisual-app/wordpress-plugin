import { md5 } from "js-md5";
import appConfig from "./config/appConfig";

const appUniqueNameHash = md5("revisual");
export const fieldName = (fieldName) => {
	return `${appUniqueNameHash}_${fieldName}`;
};

export const attachLoaderScript = (dom, callback = () => {}) => {
	if (document.getElementById("dce-embeddable-script-js")) {
		callback();
		return;
	}

	const script = document.createElement("script");
	script.src = appConfig.loaderScriptUrl;
	script.id = "dce-embeddable-script-js";
	script.dataset.widgetsEndpoint = appConfig.appUrl;
	script.onload = callback;
	dom.appendChild(script);
};

/**
 * Tells whether block attributes have a selected widget
 * @param attributes
 * @returns {boolean}
 */
export const hasWidgetSelected = (attributes) => {
	return attributes.widgetType &&
		attributes.widgetType.length &&
		attributes.uuid &&
		attributes.uuid.length
		? true
		: false;
};

/**
 *
 * @param message
 */
export const postMessageToContentWindow = (message) => {
	if (document.querySelector("[name='editor-canvas']")) {
		document
			.querySelector("[name='editor-canvas']")
			.contentWindow.postMessage(message, "*");
	} else {
		window.postMessage(message, "*");
	}

	/*document
		.querySelector("[name='editor-canvas']")
		?.contentWindow.postMessage(message, "*");*/
};

/**
 * Copies text to clipboard
 * @param text
 */
export const copyTextToClipboard = (text) => {
	var textArea = document.createElement("textarea");

	//
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a
	// flash, so some of these are just precautions. However in
	// Internet Explorer the element is visible whilst the popup
	// box asking the user for permission for the web page to
	// copy to the clipboard.
	//

	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position = "fixed";
	textArea.style.top = 0;
	textArea.style.left = 0;

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width = "2em";
	textArea.style.height = "2em";

	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding = 0;

	// Clean up any borders.
	textArea.style.border = "none";
	textArea.style.outline = "none";
	textArea.style.boxShadow = "none";

	// Avoid flash of white box if rendered for any reason.
	textArea.style.background = "transparent";

	textArea.value = text;

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand("copy");
		var msg = successful ? "successful" : "unsuccessful";
		console.log("Copying text command was " + msg);
	} catch (err) {
		console.log("Oops, unable to copy");
	}

	document.body.removeChild(textArea);
};

/**
 * Returns the shortcode for a widget type and UUID.
 * @param {string} widgetType
 * @param {string} widgetUUID
 * @param {string} template
 * @returns {`[revisual type="${string}" id="${string}"]`}
 */
export const getShortCode = (widgetType, widgetUUID, template) => {
	return `[revisual type="${widgetType}" id="${widgetUUID}" template="${template}"]`;
};

/**
 *
 * @param str
 * @returns {string}
 */
export function ucFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
