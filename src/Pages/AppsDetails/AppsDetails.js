import React from 'react';
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../../utils/api/config";
import {deleteAppsDetailsAction, getAppsDataAction} from "../../Store/actions/appsDataAction";
import Table from "../../Common/View/Table";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DifferenceIcon from '@mui/icons-material/Difference';
import styles from './AppsDetails.module.css';

function modifyData(data) {
    return data.map((item)=>{
        return {...item?.appData?.App_Details, _id : item?._id}
    })
}

const AppsDetails = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { appsData, createdBy } = useSelector( (state) => ({
        appsData: state.appsData?.data,
        createdBy : state?.auth?.user?._id,
    }));

    React.useEffect(()=>{
        if(createdBy) dispatch(getAppsDataAction({params: createdBy}))
    },[createdBy]);

    const deleteApp = async (id) =>{
        await dispatch(deleteAppsDetailsAction({
            params : id
        }));
        await dispatch(getAppsDataAction({params: createdBy}));
    };

    const columns = [
        {
            id: 'name',
            label: 'App Name',
            minWidth: 170,
        },
        {
            id: '_id',
            label: 'App Details API',
            minWidth: 100,
            align: 'right',
            format: (value,index) => (
                <div>
                    {value?.slice(0,16) + '...'}
                    <span
                        class={styles.tooltip}
                        onClick={()=>{
                            navigator.clipboard.writeText(`${BASE_URL}app/appDetails/${value}`);
                            let tooltip = document.getElementById(`myTooltip${index}`);
                            tooltip.innerHTML = "Copied ";
                        }}
                        onMouseOut={()=>{
                            var tooltip = document.getElementById(`myTooltip${index}`);
                            tooltip.innerHTML = "Copy to clipboard";
                        }}>
            <span className={styles.tooltiptext} id={`myTooltip${index}`}>Copy to clipboard</span>
            <ContentCopyIcon
                className={styles.copyBtn}

            />
            </span>
                </div>),
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 30,
            align: 'right',
            format: (value) => `${value}`,
        },
        {
            id: 'msg',
            label: 'Message',
            minWidth: 170,
            align: 'right',
            format: (value) => value,
        },
        {
            id: '_id',
            label: 'Create Duplicat',
            minWidth: 20,
            align: 'right',
            format: (value) => (
                <span>
                <DifferenceIcon onClick={()=> navigate(`/addAppDetails?create-new-copy=${value}`)}/>
                </span>),
        },
        {
            id: '_id',
            label: 'Action',
            minWidth: 30,
            align: 'right',
            format: (value) => (
                <span>
                <EditIcon onClick={()=> navigate(`/appsDetails/edit/${value}`)}/>
                <DeleteIcon onClick={()=>deleteApp(value)}/>
                </span>),
        },
    ];

    return (
        <div >
            <Table columns={columns} rows={modifyData(appsData)}/>
        </div>
    )
}

export default AppsDetails;
