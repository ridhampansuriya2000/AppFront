import { combineReducers } from "redux";
import loaderReducer from "./loader/loaderReducer";
import apiResReducer from "./apiRes/apiResReducer";
import appsDataReducer from "./reducers/appsDataReducer";
import authReducer from "./reducers/authReducer";
import usersDataReducer from "./reducers/usersDataReducer";
// import dashboardReducer from "./dashboard/DashboardReducer";

export default combineReducers({
  loader: loaderReducer,
  apiRes: apiResReducer,
  appsData: appsDataReducer,
  usersData: usersDataReducer,
  auth: authReducer,
  // dashboard: dashboardReducer,
});
