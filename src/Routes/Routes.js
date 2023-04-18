import React from 'react';
import Home from "../Pages/Home";

// Icons
import HomeIcon from '@mui/icons-material/Home';
import AboutUs from "../Pages/AboutUs";

export const routes = [
    {
        title : 'Home',
        icon : <HomeIcon/>,
        path : '/',
        component: <Home/>,
        isVisibleOnSidebar : true
    },
    {
        title : 'AboutUs',
        icon : <HomeIcon/>,
        path : '/',
        component: <AboutUs/>,
        isVisibleOnSidebar : true
    },
    {
        title : 'Home',
        icon : <HomeIcon/>,
        path : '/',
        component: <Home/>,
        isVisibleOnSidebar : true
    },
    {
        title : 'AboutUs',
        icon : <HomeIcon/>,
        path : '/',
        component: <AboutUs/>,
        isVisibleOnSidebar : true
    }
];