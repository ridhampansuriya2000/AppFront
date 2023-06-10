import React from 'react';
import AppDetails from "../../Components/AppDetails";
import Button from "../../Common/View/Button";
import {convertObjToArray, createObj} from "../../Common/Functions/functoin";
import styles from './CustomForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addAppsDetailsAction, getAppDataAction, updateAppsDetailsAction} from "../../Store/actions/appsDataAction";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const defualtAppsData = [
    {
        detailsTitle:'App_Details',
        fields:[['name','','string'],['status','','boolean'],['msg','','string']],
        fieldType : 'string'
    },
];

const CustomForm = ({isEdit}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { auth } = useSelector((state)=>({
        auth : state.auth
    }));

    const [appData,setAppData] = React.useState([
        {
            detailsTitle:'App_Details',
            fields:[['name','','string'],['status',false,'boolean'],['msg','','string']],
            fieldType : 'string'
        },
    ]);
    const [currentPage,setCurrentPage] = React.useState(0);
    const [isNextDisabled,setIsNextDisabled] = React.useState(false);



    const [detailsTitle,setDetailsTitle] = React.useState('');
    const [pageData,setPageData] = React.useState([]);
    const [sectionData,setSectionData] = React.useState([]);

    React.useEffect( ()=>{
        (async ()=>{
            if(isEdit){
                let data = await dispatch(getAppDataAction({
                    params : location?.pathname?.split('/')[location?.pathname?.split()?.length + 2],
                }))
                let arr = convertObjToArray(data?.apiRes?.lastApiRes?.payload?.appData);
                setAppData(()=>arr);
                setDetailsTitle(()=>arr[currentPage]?.detailsTitle);
                setPageData(()=>arr[currentPage]?.fields);
                setSectionData(()=> arr[currentPage]?.sections);
            }else {
                setPageData(()=>[['name','','string'],['status','','boolean'],['msg','','string']]);
                setSectionData(()=> []);
                setDetailsTitle(()=>'App_Details');
            }
        })()
    },[isEdit])

    const getPageData = React.useMemo(()=>{
        return appData[currentPage]
    },[appData.length,currentPage]);


    return (
        <div>
            <div className={styles.buttons}>
                <div className={styles.pageHandlerButtons}>
                    <Button
                        onClick={()=>{
                            setCurrentPage((preState)=>preState - 1);
                        }}
                        disabled={0 >= currentPage}
                    >
                        Previous Page
                    </Button>
                    <Button
                        onClick={()=>{
                            appData.length - 1 === currentPage &&
                            setAppData((preState)=>(
                                [...preState,{
                                    detailsTitle:'',
                                    fields:[['','','string']],
                                    sections:[{title:'',fields:[['','','string']]}],
                                    fieldType : 'string'
                                }]
                            ))
                            setCurrentPage((preState)=>preState + 1);
                        }}
                        disabled={isNextDisabled}
                    >
                        {appData.length - 1 === currentPage ? 'Add Page' : 'Next Page'}
                    </Button>
                </div>

                <div className={styles.formHandlerBtn}>
                <Button
                    disabled={appData.length === 1 || currentPage === 0}
                    onClick={()=>{
                        setAppData((preState)=>{
                            let arr = preState;
                            arr.splice(currentPage,1);
                            return [...arr]
                        } );
                        (currentPage !== (appData.length -1)) && setCurrentPage((prePage)=> prePage -1)
                    }}
                >
                    Delete page
                </Button>
                    <Button
                        disabled={isNextDisabled || (currentPage !== (appData.length -1))}
                        onClick={async ()=> {
                            createObj(appData);
                            convertObjToArray(createObj(appData));
                            if(isEdit){
                                await dispatch(updateAppsDetailsAction({
                                    payload : { appData : createObj(appData) },
                                    params : location?.pathname?.split('/')[location?.pathname?.split()?.length + 2],
                                }))
                            }else {
                                await dispatch(addAppsDetailsAction({
                                    payload :{ appData : createObj(appData), createdBy : auth?.user?._id}
                                }));
                            }
                            navigate("/appsDetails");
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <AppDetails
                appData={appData}
                data={getPageData}
                setAppData={setAppData}
                currentPage={currentPage}
                setIsNextDisabled={setIsNextDisabled}
                setPageData={setPageData}
                pageData={pageData}
                setSectionData={setSectionData}
                sectionData={sectionData}
                detailsTitle={detailsTitle}
                setDetailsTitle={setDetailsTitle}
            />
        </div>
    )
}

export default CustomForm;
