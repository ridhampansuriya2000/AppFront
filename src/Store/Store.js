import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import ReduxThunk from 'redux-thunk';
import LoggerMiddleWare from "./middlewares/logger.middleware";
import MonitorReducerEnhancer from "./enhancers/monitorReducer";
import rootReducer from "./root.reducer";
import httpActions from "../api/httpActions";

export default function configureStore() {
    const middlewares = [ReduxThunk,LoggerMiddleWare, thunkMiddleware,httpActions];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer, MonitorReducerEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, {}, composedEnhancers);

    return store;
}
