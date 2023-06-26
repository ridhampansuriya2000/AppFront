import {
    LOGIN,
    SIGN_UP,
    LOGOUT,
    REFRESH_USER,
} from '../types/authTypes';

export const loginAction = data =>({
    type: LOGIN,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/auth/login`,
    method: 'POST',
    accessAndContentHeaders:true,
    body: data.payload,
    callBackFun: data.callBackFun
});

export const signUpAction = data =>({
    type: LOGOUT,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/auth/signup`,
    method: 'POST',
    accessAndContentHeaders:true,
    body: data.payload,
    callBackFun: data.callBackFun
});

export const logOutAction = data =>({
    type: SIGN_UP,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/auth/logout`,
    method: 'GET',
    accessAndContentHeaders:true,
    callBackFun: data.callBackFun
});

export const refreshUserAction = data =>({
    type: REFRESH_USER,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/auth/user/me`,
    method: 'GET',
    accessAndContentHeaders:true,
    fallBackFun: data.fallBackFun
});