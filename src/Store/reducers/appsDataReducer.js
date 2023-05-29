import {
    GET_APPS_DATA,
    CREATE_APPS_DATA
} from '../types/appsDataTypes';

const appsDataObj = {
    data : [],
};

const appsDataReducer = (state = JSON.parse(JSON.stringify(appsDataObj)), {type, payload}) => {
    switch (type) {
        case `${GET_APPS_DATA}_SUCCESS` : {
            return {
                ...state,
                data: payload,
            }
        }

        default : {
            return state;
        }
    }
};

export default appsDataReducer;