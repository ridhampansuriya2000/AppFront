import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../../utils/api/config";
import {deleteAppsDetailsAction, getAppsDataAction} from "../../Store/actions/appsDataAction";
import Table from "../../Common/View/Table";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import DifferenceIcon from '@mui/icons-material/Difference';
import styles from './UsersDetails.module.css';
import {deleteUserDetails, getUserDetails} from "../../Store/actions/userAction";

function modifyData(data) {
    return data.map((item)=>{
        return {...item, name : `${item.firstName} ${item.lastName}`}
    })
}

const UsersDetails = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { usersData, createdBy } = useSelector( (state) => ({
        usersData: state.usersData?.data,
        createdBy : state?.auth?.user?._id,
    }));


    React.useEffect(()=>{
        dispatch(getUserDetails());
    },[]);

    const deleteApp = async (id) =>{
        await dispatch(deleteUserDetails({
            params : id
        }));
        await dispatch(getUserDetails());
    };

    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
        },
        // {
        //     id: '_id',
        //     label: 'App Details API',
        //     minWidth: 100,
        //     align: 'right',
        //     format: (value,index) => (
        //         <div>
        //             {value?.slice(0,16) + '...'}
        //             <span
        //                 class={styles.tooltip}
        //                 onClick={()=>{
        //                     navigator.clipboard.writeText(`${BASE_URL}app/appDetails/${value}`);
        //                     let tooltip = document.getElementById(`myTooltip${index}`);
        //                     tooltip.innerHTML = "Copied ";
        //                 }}
        //                 onMouseOut={()=>{
        //                     var tooltip = document.getElementById(`myTooltip${index}`);
        //                     tooltip.innerHTML = "Copy to clipboard";
        //                 }}>
        //     <span className={styles.tooltiptext} id={`myTooltip${index}`}>Copy to clipboard</span>
        //     <ContentCopyIcon
        //         className={styles.copyBtn}
        //
        //     />
        //     </span>
        //         </div>),
        // },
        {
            id: 'email',
            label: 'Email',
            minWidth: 30,
            align: 'right',
            format: (value) => `${value}`,
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 170,
            align: 'right',
            format: (value) => value,
        },
        {
            id: 'createdAt',
            label: 'Created',
            minWidth: 170,
            align: 'right',
            format: (value) => value,
        },
        {
            id: '_id',
            label: 'Show Apps',
            minWidth: 30,
            align: 'right',
            format: (value) => (
                <span>
                 <LoginIcon onClick={()=> navigate(`/usersDetails/appsDetails/${value}`)} />
                </span>),
        },
        {
            id: '_id',
            label: 'Action',
            minWidth: 30,
            align: 'right',
            format: (value) => (
                <span>
                <DeleteIcon onClick={()=>deleteApp(value)}/>
                    {/*<EditIcon*/}
                    {/*    onClick={()=> navigate(`/usersDetails/appsDetails/${value}`)}*/}
                    {/*/>*/}
                    {/*<LoginIcon onClick={()=> navigate(`/usersDetails/appsDetails/${value}`)} />*/}
                </span>),
        },
    ];

    return (
        <div >
            <Table columns={columns} rows={modifyData(usersData)}/>
        </div>
    )
}

export default UsersDetails;
