import React, {useState} from "react";
import {useLocation} from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import {refreshUserAction} from "../Store/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Content from "./Contant";
import Loader from "../Common/View/Loader";
import styles from './Layout.module.css';

const Layout = ({routes}) =>{

    const dispatch = useDispatch();
    const isMobile = useMediaQuery((theme) => theme?.breakpoints.down('lg'));
    const location = useLocation();

    const { loaderStatus } = useSelector((state)=>({
        loaderStatus : state.loader.status,
    }))

    const childProps = {
        isMobile,
        location
    }

    const [open, setOpen] = useState(true);
    const drawerHandler = () => setOpen((preState)=> !preState);

    window.onload = () => {
        dispatch(refreshUserAction())
    }
    // React.useEffect(()=>{
    //     dispatch(refreshUserAction())
    // },[]);
 return (
     <div className={styles.main}>
         <TopNav drawerHandler={drawerHandler} {...childProps}/>
         <div className={styles.wrapper}>
             <Sidebar
                 routes={routes}
                 isOpenSidebar={open}
                 onCloseSidebar={() => setOpen(false)}
                 {...childProps}
             />
             <Content routes={routes} {...childProps}/>
             {/*  Full Page Loader*/}
             {loaderStatus && (
                 <Loader />
             )}
         </div>
     </div>
 )
};

export default Layout;