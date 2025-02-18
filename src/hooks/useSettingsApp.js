import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import * as settingsAppActions from "./../actions/settingsApp";

export function useSettingsAppStore() {
	const dispatch = useDispatch();

	const disconnectPlugin = useCallback(
		async () => await dispatch(settingsAppActions.disconnectPlugin()),
		[dispatch],
	);

	return {
		disconnectPlugin,
	};
}
