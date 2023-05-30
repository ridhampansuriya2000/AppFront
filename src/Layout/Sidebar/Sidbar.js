import React from "react";
import {Box,  Drawer} from "@mui/material";
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styles from './Sidebar.module.css';
import {routes} from '../../Routes/Routes';
import {Outlet, Link, useLocation} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const DRAWER_WIDTH = 300;

const RenderContent = ({isOpenSidebar, location}) => {
    return (
        <Box sx={{color:' #e4e8ff', marginTop:'30px'}}>
            {/*<Divider />*/}
            <List>
                {(routes).filter(item => item.isVisibleOnSidebar ).map((component, index) => (
                    <Link to={component.path} style={{color: 'inherit', textDecoration: 'none'}}>
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                width : '96%',
                                minHeight: 48,
                                margin : '1% 2%',
                                borderRadius : '10px',
                                justifyContent: isOpenSidebar ? 'initial' : 'center',
                                px: 2.5,
                                "&:hover" : {
                                    background : '#cfd6ff',
                                    color: '#3f51b5'
                                },
                                background : '/'+(location?.pathname)?.split('/')[1] === component?.path ? '#cfd6ff' : '',
                                color : '/'+(location?.pathname)?.split('/')[1] === component?.path ? '#3f51b5' : '',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpenSidebar ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color:'inherit'
                                }}
                            >
                                {component.icon}
                            </ListItemIcon>
                            <ListItemText primary={component.title} sx={{ opacity: isOpenSidebar ? 1 : 0,
                            "& .css-zelrgz-MuiTypography-root":{
                                color:'inherit'
                            },
                            "& .MuiTypography-root":{
                                color:'inherit'
                            }}} />
                        </ListItemButton>
                    </ListItem>
                    </Link>
                ))}
            </List>
            <Divider color='#e4e8ff'/>

        </Box>
    )
}

const openedMixin = (theme) => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const LeftDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        height:'100%',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiPaper-elevation':{
          position:'unset',
            boxSizing: 'border-box',
            backgroundColor:'#515989',
            color:'#e4e8ff'
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = ({isOpenSidebar, onCloseSidebar, ...childProps}) => {
    const {location, isMobile} = childProps;

    React.useEffect(()=>{
        console.log("params",location);
        console.log("childProps",childProps);
    },[location]);
    return (
        <div className={styles.main}>
            {isMobile &&
            <Drawer
                open={!isOpenSidebar}
                onClose={onCloseSidebar}
                anchor='right'
                PaperProps={{
                    sx: {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        backgroundColor:'#515989',
                    },
                }}
            >
                <Box sx={{
                    display:'flex',
                    justifyContent:'flex-end',
                    alignItems:'center',
                    color:'#e4e8ff',
                    height:'70px',
                }}>
                    <CloseIcon fontSize='large'
                               color={'inherit'}
                               sx={{marginRight:'20px',cursor:'pointer',}}
                               onClick={onCloseSidebar}
                    />
                </Box>
                <RenderContent
                    isOpenSidebar={!isOpenSidebar}
                    currentRoute = {location?.pathname}
                    location={location}
                />
            </Drawer>}

            {!isMobile &&
            <LeftDrawer variant="permanent" open={isOpenSidebar}>
                <RenderContent
                    isOpenSidebar={isOpenSidebar}
                    currentRoute = {location?.pathname}
                    location={location}
                />
            </LeftDrawer>}
        </div>
    )
}

export default Sidebar;
