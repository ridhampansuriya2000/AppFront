import {GET_USERS_DATA, DELETE_USER_DATA} from "../types/userTypes";

export const getUserDetails = data =>({
    type: `${GET_USERS_DATA}`,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/users/list`,
    method: 'GET',
    accessAndContentHeaders:true,
});

export const deleteUserDetails = data =>({
    type: DELETE_USER_DATA,
    toasterString: `Waiting for new data.`,
    isHttpAction: true,
    url: `/user/delete/${data?.params}`,
    method: 'DELETE',
    accessAndContentHeaders:true,
});