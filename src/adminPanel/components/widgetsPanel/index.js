/**
 * Created by piotr.pozniak@thebeaverhead.com on 07/07/2024
 */

import { TabPanel } from "@wordpress/components";
import { useWidgetsStore } from "../../../hooks/useWidgets";
import InitialLoading from "../InitialLoading";
import { useState, useCallback, useMemo } from "@wordpress/element";
import WidgetTab from "./WidgetTab";
import { AvailableWidgets } from "../../../consts";

const WidgetsCard = (props) => {
	const [currentTab, setCurrentTab] = useState();
	const { widgets } = useWidgetsStore();
	/*const panels =AvailableWidgets.map((i, idx) => {
		const item = AvailableWidgets[i];
		return <WidgetPanel key={`wcp-${idx}`} {...item} />;
	});
*/

	const onTabChange = useCallback((tab) => {}, []);

	const tab = useCallback(
		(tab) => <WidgetTab {...tab} />,
		[currentTab, widgets.collection]
	);
	//
	// if (widgets.fetch) {
	// //	return <InitialLoading />;
	// }
	return (
		<>
			<TabPanel
				onSelect={onTabChange}
				tabs={AvailableWidgets}
				className={"rev-widgets-selector-panel"}
			>
				{tab}
			</TabPanel>
		</>
	);
};

export default WidgetsCard;
