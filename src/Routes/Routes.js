import React from 'react';
import Home from "../Pages/Home";

// Icons
import HomeIcon from '@mui/icons-material/Home';
import AdbIcon from '@mui/icons-material/Adb';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import InfoIcon from '@mui/icons-material/Info';
import Logout from "@mui/icons-material/Logout";
//Components
import AboutUs from "../Pages/AboutUs";
import AddAppDetails from "../Pages/AddAppDetails";
import AppsDetails from "../Pages/AppsDetails";

export const routes = [
    {
        title : 'Home',
        icon : <HomeIcon/>,
        path : '/',
        component: <Home/>,
        isVisibleOnSidebar : true,
        isNeedAuthenticat : true,
    },
    {
        title : 'Home',
        icon : <HomeIcon/>,
        path : '/appsDetails/edit/:appId',
        component: <AddAppDetails isEdit={true}/>,
        isVisibleOnSidebar : false,
        isNeedAuthenticat : false
    },
    {
        title : 'Add App Details',
        icon : <AddToHomeScreenIcon/>,
        path : '/addAppDetails',
        component: <AddAppDetails/>,
        isVisibleOnSidebar : true,
        isNeedAuthenticat : false
    },
    {
        title : 'Apps Details',
        icon : <AdbIcon/>,
        path : '/appsDetails',
        component: <AppsDetails/>,
        isVisibleOnSidebar : true,
        isNeedAuthenticat : true
    },
    {
        title : 'AboutUs',
        icon : <InfoIcon/>,
        path : '/aboutUs',
        component: <AboutUs/>,
        isVisibleOnSidebar : true,
        isNeedAuthenticat : true
    },
];

export const bottomRoutes = [
    {
        title : 'Logout',
        icon : <Logout fontSize="small" />,
        isVisibleOnSidebar : true,
        isNeedAuthenticat : true
    },
];

