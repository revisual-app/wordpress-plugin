/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * Internal dependencies
 */
import Edit from "./blockEditor/edit";
import save from "./blockEditor/save";
import metadata from "./block.json";
import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import SettingsApp from "./adminPanel/SettingsApp";
import { PersistGate } from "redux-persist/integration/react";
import { AppIconRaw } from "./adminPanel/components/AppIcon";
const blockEditor = (props) => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Edit {...props} />
		</PersistGate>
	</Provider>
);
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: blockEditor,

	/**
	 * @see ./save.js
	 */
	save,

	title: "Revisual",

	attributes: {
		widgetType: {
			type: "string",
			default: "calendar",
		},
		uuid: {
			type: "string",
		},
		template: {
			type: "string",
		},
		widgetSlug: {
			type: "string",
		},
		iframe: {
			type: "boolean",
		},
	},
	icon: AppIconRaw,
});

domReady(() => {
	const settingsPageDom = document.getElementById("_rev--settings-page");
	if (!settingsPageDom) {
		return;
	}
	const root = createRoot(document.getElementById("_rev--settings-page"));

	root.render(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SettingsApp />
			</PersistGate>
		</Provider>,
	);
});
