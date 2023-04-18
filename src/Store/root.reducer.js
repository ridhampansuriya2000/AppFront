import { combineReducers } from "redux";
import loaderReducer from "./loader/loaderReducer";
import apiResReducer from "./apiRes/apiResReducer";
import dashboardReducer from "./dashboard/DashboardReducer";

export default combineReducers({
  loader: loaderReducer,
  apiRes: apiResReducer,
  dashboard: dashboardReducer,
});
