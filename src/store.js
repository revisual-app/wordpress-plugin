import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wpSettingsReducer from "./reducers/wpSettingsSlice";
import orgInfoReducer from "./reducers/orgInfoSlice";
import widgetsReducer from "./reducers/widgetsSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { fieldName } from "./utils";

const persistConfig = {
	key: fieldName("store"),
	storage,
	whitelist: ["orgInfo"],
};

const reducer = combineReducers({
	wpSettings: wpSettingsReducer,
	orgInfo: orgInfoReducer,
	widgets: widgetsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
