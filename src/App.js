import React, {useEffect, useState} from "react";
import './App.css';
import Layout from "./Layout";
import {ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {theme} from "./styles/theme";
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {routes} from "./Routes/Routes";
import {userRoles} from './Routes/user';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import {refreshUserAction} from "./Store/actions/authAction";

const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false
}

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {role} = useSelector((state) => ({
        role: state.auth?.user?.role,
    }));

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (!mounted) {
            (async () => await dispatch(refreshUserAction({
                fallBackFun: () => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            })))()
            setMounted(true);
        }
    }, [mounted])

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Routes>
                    <Route exact path="/login" element={<SignIn/>}/>
                    <Route exact path="/sign-up" element={<SignUp/>}/>

                    <Route
                        path="/*"
                        element={
                            isAuthenticated() ?
                                userRoles.map((item) => {
                                    if (item.value !== role) return null;
                                    const {userRoutes} = routes.find((obj) => {
                                        return obj.permission === role;
                                    });
                                    return <Layout routes={userRoutes}/>
                                })
                                : <Navigate to="/login" replace={true}/>
                        }
                    />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
