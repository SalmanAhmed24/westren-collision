import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./root-reducer";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const middlerWares = [logger];
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, ...middlerWares)
);
export const persistedStore = persistStore(store);
