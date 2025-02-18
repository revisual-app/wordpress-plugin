import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import * as orgInfoActions from "./../actions/orgInfo";

export function useOrgInfoStore() {
	const dispatch = useDispatch();
	const _orgInfo = useSelector((store) => store.orgInfo);

	const fetchOrgInfo = useCallback(
		async () => await dispatch(orgInfoActions.fetchOrgInfo()),
		[dispatch],
	);

	return {
		orgInfo: _orgInfo,
		fetchOrgInfo,
	};
}
