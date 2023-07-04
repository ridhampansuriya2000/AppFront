import {GET_USERS_DATA} from "../types/userTypes";

const usersDataObj = {
    data : [],
};

const usersDataReducer = (state = JSON.parse(JSON.stringify(usersDataObj)), {type, payload}) => {
    switch (type) {
        case `${GET_USERS_DATA}_SUCCESS` : {
            return {
                ...state,
                data: payload.data,
            }
        }

        default : {
            return state;
        }
    }
};

export default usersDataReducer;