import {
    GET_APPS_DATA,
    CREATE_APPS_DATA,
    GET_APP_DATA,
    UPDATE_APPS_DATA,
} from '../types/appsDataTypes';

export const getAppsDataAction = data =>({
    type: `${GET_APPS_DATA}`,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/posts/${data?.params}`,
    method: 'GET',
    accessAndContentHeaders:true,
});

export const addAppsDetailsAction = data =>({
    type: CREATE_APPS_DATA,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/register`,
    method: 'POST',
    accessAndContentHeaders:true,
    body: data.payload,
    callBackFun: data.callBackFun
});

export const updateAppsDetailsAction = data =>({
    type: UPDATE_APPS_DATA,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/update/${data?.params}`,
    method: 'POST',
    accessAndContentHeaders:true,
    body: data.payload,
    callBackFun: data.callBackFun
});

export const deleteAppsDetailsAction = data =>({
    type: UPDATE_APPS_DATA,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/appDetails/delete/${data?.params}`,
    method: 'DELETE',
    accessAndContentHeaders:true,
});

export const getAppDataAction = data =>({
    type: `${GET_APP_DATA}`,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/appDetails/${data?.params}`,
    method: 'GET',
    accessAndContentHeaders:true,
});