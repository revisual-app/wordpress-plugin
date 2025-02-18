import { AvailableTemplates, AvailableWidgets } from "../consts";
import { useMemo } from "@wordpress/element";

const useWidgetTypeOptions = () => {
	const options = useMemo(() => {
		const options = AvailableWidgets.map((i) => ({
			label: i.title,
			value: i.name,
		}));

		options.unshift({ label: "Select widget", value: "" });
		return options;
	}, []);

	return options;
};

export default useWidgetTypeOptions;
