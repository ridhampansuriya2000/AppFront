import {
    LOGIN, LOGOUT, REFRESH_USER
} from '../types/authTypes';

const authObj = {
};

const authReducer = (state = JSON.parse(JSON.stringify(authObj)), {type, payload}) => {
    switch (type) {
        case `${LOGIN}_SUCCESS` : {
            return {
                ...state,
                 ...payload,
            }
        }
        case `${REFRESH_USER}_SUCCESS` : {
            return {
                ...state,
                 token : payload.token,
                user : payload.user,
            }
        }
        case `${LOGOUT}_SUCCESS` : {
            return {}
        }

        default : {
            return state;
        }
    }
};

export default authReducer;