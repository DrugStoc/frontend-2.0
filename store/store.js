import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers/rootReducer";
import storage from "redux-persist/lib/storage";

const middleware = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);

const makeStore =  () => store;

const persistor = persistStore(store);

const wrapper = createWrapper(makeStore);

export { wrapper, persistor, store };
