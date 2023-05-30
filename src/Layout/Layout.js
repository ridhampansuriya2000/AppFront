import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import {refreshUserAction} from "../Store/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Content from "./Contant";
import Loader from "../Common/View/Loader";
import styles from './Layout.module.css';

const Layout = ({routes}) => {

    const dispatch = useDispatch();
    const isMobile = useMediaQuery((theme) => theme?.breakpoints.down('lg'));
    const location = useLocation();

    const {loaderStatus} = useSelector((state) => ({
        loaderStatus: state.loader.status,
    }))

    const childProps = {
        isMobile,
        location
    }

    const [open, setOpen] = useState(true);
    const drawerHandler = () => setOpen((preState) => !preState);

    // window.onload = () => {
    //     dispatch(refreshUserAction())
    // }

    const [mounted, setMounted] = useState(false)
    console.log("mounted", mounted)
    if (!mounted) {
        (async  ()=> await dispatch(refreshUserAction()))()
        setMounted(true)
        // Code for componentWillMount here
        // This code is called only one time before intial render
    }

    return (
        <div className={styles.main}>
            <TopNav drawerHandler={drawerHandler} {...childProps}/>
            <div className={styles.wrapper}>
                <Sidebar
                    routes={routes}
                    isOpenSidebar={open}
                    onCloseSidebar={() => setOpen((preVal) => !preVal)}
                    {...childProps}
                />
                <Content routes={routes} {...childProps}/>
                {/*  Full Page Loader*/}
                {loaderStatus && (
                    <Loader/>
                )}
            </div>
        </div>
    )
};

export default Layout;
