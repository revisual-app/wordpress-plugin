import { Spinner, Flex, FlexItem } from "@wordpress/components";

const _spinnerStyle = {
	height: "calc(4px * 20)",
	width: "calc(4px * 20)",
};

const _containerStyle = {
	height: "70vh",
};

const InitialLoading = () => {
	return (
		<Flex align={"center"} justify={"center"} style={_containerStyle}>
			<FlexItem>
				<Spinner style={_spinnerStyle} />
			</FlexItem>
		</Flex>
	);
};

export default InitialLoading;
