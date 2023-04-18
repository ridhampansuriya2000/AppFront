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
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './Sidebar.module.css';
import {routes} from '../../Routes/Routes';

const DRAWER_WIDTH = 300;

const RenderContent = ({isOpenSidebar}) => {
    return (
        <Box sx={{color:' #e4e8ff'}}>
            <Divider />
            <List>
                {(routes).filter(item => item.isVisibleOnSidebar ).map((component, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                width : '96%',
                                minHeight: 48,
                                margin : '0% 2%',
                                borderRadius : '10px',
                                justifyContent: isOpenSidebar ? 'initial' : 'center',
                                px: 2.5,
                                "&:hover" : {
                                    background : '#cfd6ff',
                                    color: '#3f51b5'
                                }
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
                            }}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider color='#e4e8ff'/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: isOpenSidebar ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpenSidebar ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color:' #e4e8ff'
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: isOpenSidebar ? 1 : 0, color:' #e4e8ff' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
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

const Sidebar = ({isOpenSidebar, onCloseSidebar}) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    return (
        <div className={styles.main}>
            {isMobile &&
            <Drawer
                open={isOpenSidebar}
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
                <RenderContent isOpenSidebar={isOpenSidebar}/>
            </Drawer>}

            {!isMobile &&
            <LeftDrawer variant="permanent" open={isOpenSidebar}>
                {/*{renderContent(isOpenSidebar)}*/}
                <RenderContent isOpenSidebar={isOpenSidebar}/>
            </LeftDrawer>}
        </div>
    )
}

export default Sidebar;
