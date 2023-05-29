import {
  API_RESPONSES,
} from "./apiResType";

const apiRes = {
  apiResponses : [],
  lastApiRes : {}
};

const apiResReducer = (state = JSON.parse(JSON.stringify(apiRes)), {type, payload}) => {
  switch (type) {
    case `${API_RESPONSES}` : {
      return {
        ...state,
        apiResponses: [...state.apiResponses, payload],
        lastApiRes: {
          payload
        }
      }
    }

    default : {
      return state;
    }
  }
};

export default apiResReducer;