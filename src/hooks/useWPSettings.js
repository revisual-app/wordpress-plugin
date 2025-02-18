import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import * as wpSettingsActions from "./../actions/wpSettings";

export function useWPSettingsStore() {
	const dispatch = useDispatch();
	const _wpSettings = useSelector((store) => store.wpSettings);

	const fetchWpSettings = useCallback(
		async (uuid) => await dispatch(wpSettingsActions.fetchWPSettings()),
		[dispatch],
	);

	return {
		wpSettings: _wpSettings,
		fetchWpSettings,
	};
}
