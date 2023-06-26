import axios from "axios";
import {BASE_URL} from "./config";
import {toast} from "react-toastify";
import {LOADER_END, LOADER_START} from "../../Store/loader/loaderType";
import {API_RESPONSES} from "../../Store/apiRes/apiResType";

const defaultToasterOptions = {
    isLoading: false,
    autoClose: 4000,
    closeButton: true,
};

const httpActions = (e) => next => async action => {
    const {
        method = "GET",
        toasterString,
        url,
        isHttpAction,
        headers,
        type,
        body,
        accessAndContentHeaders=true,
        callBackFun = async (data)=> await data,
        fallBackFun = async (data)=> await data
    } = action;
    const authKey = localStorage.getItem("token");

    if (isHttpAction) {

        await next({
            type: `${LOADER_START}`,
            payload: {}
        });

        let toasterId;
        toasterString && (toasterId = await toast.loading(toasterString || `Waiting for Response`));
        await next({
            type: `${type}_FETCHING`,
            payload: {},
        });
        const baseURL = BASE_URL;
        const accessAndContentHeader = accessAndContentHeaders ? {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Methods': 'POST, GET',
            'Access-Control-Request-Headers': 'X-PINGOTHER; Content-Type',
        } : {};
        try {
            const response = await axios({
                url,
                headers: {
                    Authorization: authKey || '',
                    ...accessAndContentHeader,
                    ...headers,
                },
                baseURL,
                data: body,
                method,
            });
            const {data} = response;
            if (toasterId) await toast.update(toasterId, {
                type: 'success',
                render: data.message || `Success`, ...defaultToasterOptions
            });

            let res = await callBackFun(data);

            await next({
                type: API_RESPONSES,
                payload: res ?? data,
                actionType: `${type}_SUCCESS`,
            });
            await next({
                type: `${type}_SUCCESS`,
                payload: res ?? data,
            });
        } catch (e) {
            const {response} = e;
            let res = await fallBackFun(e);
            console.error('Error : got in httpsAction',e);
            if (toasterId) await toast.update(toasterId, {
                type: 'error',
                render: response?.data?.message || `Something going wrong !`,
                ...defaultToasterOptions,
            });
            await next({
                type: API_RESPONSES,
                payload: {message: response?.data, e},
                actionType: `${type}_FAILED`,
            })
            await next({
                type: `${type}_FAILED`,
                payload: {message: response?.data?.message, e},
            });
        }

        await next({
            type: `${LOADER_END}`,
            payload: {}
        });

    } else {
        await next(action);
    }

    return e.getState();
};

export default httpActions;