import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import * as widgetsActions from "./../actions/widgets";

export function useWidgetsStore() {
	const dispatch = useDispatch();
	const _widgets = useSelector((store) => store.widgets);

	const fetchWidgets = useCallback(
		async () => await dispatch(widgetsActions.fetchWidgets()),
		[dispatch],
	);

	return {
		widgets: _widgets,
		fetchWidgets,
	};
}
