import MainPage from "./MainPage";
import { useWPSettingsStore } from "./../hooks/useWPSettings";
import AxiosConfig from "../AxiosConfig";
import "./../scss/style.scss";

const SettingsApp = () => {
	const { wpSettings } = useWPSettingsStore();
	if (!AxiosConfig.getApiKey() && wpSettings?.model?.apiKey) {
		AxiosConfig.setApiKey(wpSettings?.model?.apiKey);
	}

	return <MainPage />;
};

export default SettingsApp;
