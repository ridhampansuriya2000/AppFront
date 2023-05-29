import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

import AccountOutlinedIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import { indigo } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {styled} from "@mui/material";

import {logOutAction} from "../../Store/actions/authAction";
import styles from './TopNav.module.css';


const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
   color : '#22232a'
}));

const  TopNav = ({drawerHandler, ...childProps}) =>{

    const { isMobile} = childProps;
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    // menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () =>{
        await dispatch(logOutAction({
            callBackFun : () => {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }));
        handleClose();
    }

    return (
        <div className={styles.main}>
            <div>
                {!isMobile && <MenuIcon sx={{ color: indigo[500], fontSize: 37, cursor:'pointer' }} onClick={drawerHandler}/>}
            </div>
            <div className={styles.navButtons}>
                {!isMobile && <NotificationsNoneIcon sx={{ color: indigo[500], fontSize: 34 }} />}
                {!isMobile && <AccountOutlinedIcon sx={{ color: indigo[500], fontSize: 40 }} onClick={handleClick} />}
                {isMobile && <MenuIcon sx={{ color: indigo[500], fontSize: 37, cursor:'pointer' }} onClick={drawerHandler}/>}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            color:'#22232a',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <StyledMenuItem onClick={handleClose}>
                        <Avatar /> Profile
                    </StyledMenuItem>
                    {/*<StyledMenuItem onClick={handleClose}>*/}
                    {/*    <Avatar /> My account*/}
                    {/*</StyledMenuItem>*/}
                    {/*<Divider />*/}
                    {/*<StyledMenuItem onClick={handleClose}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <PersonAdd fontSize="small" />*/}
                    {/*    </ListItemIcon>*/}
                    {/*    Add another account*/}
                    {/*</StyledMenuItem>*/}
                    {/*<StyledMenuItem onClick={handleClose}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <Settings fontSize="small" />*/}
                    {/*    </ListItemIcon>*/}
                    {/*    Settings*/}
                    {/*</StyledMenuItem>*/}
                    <StyledMenuItem onClick={handleLogOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </StyledMenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default TopNav;