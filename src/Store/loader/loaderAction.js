import { LOADER_START, LOADER_END } from "./loaderType";

export const loaderStart = (data) => async (dispatch) => {
  dispatch({
    type:LOADER_START
  })
};
export const loaderEnd = (data) => async (dispatch) => {
  dispatch({
    type:LOADER_END
  })
};