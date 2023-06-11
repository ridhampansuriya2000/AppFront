import React from "react";
import './App.css';
import Layout from "./Layout";
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import {theme} from "./styles/theme";
import {BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import {routes} from "./Routes/Routes";
import configureStore from "./Store/Store";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

const isAuthenticated = () =>{
    return localStorage.getItem('token') ? true : false
}

// const PrivateRoute = ({component: Component, routes, ...rest}) => (
//     <Route
//         {...rest}
//         render={(props) =>
//             // hasShareLinkPage ? (
//             //     <Redirect
//             //         to={{
//             //             pathname: window.location.pathname,
//             //         }}
//             //     />
//             // ) :
//             isAuthenticated() ? (
//                 <Component routes={routes} {...props} />
//             ) : (
//                 <Navigate
//                     // to={{
//                     //     pathname: '/login',
//                     // }}
//                     to="/login"
//                     replace={true}
//                 />
//             )
//         }
//     />
// );

const PrivateRoute = ({ element: Component,routes, ...rest }) => (
    <Route
        {...rest}
        element={
            isAuthenticated() ? (
                <Component routes={routes}/>
            ) : (
                <Navigate to="/login" replace={true} />
            )
        }
    />
);

function App() {

    const store = configureStore();

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Routes>

                    <Route exact path="/login" element={<SignIn />} />
                    {/*<Route exact path="/sign-up" element={<SignUp />} />*/}
                        <Route
                            path="/*"
                            element={
                                isAuthenticated() ? (
                                    <Layout routes={routes} />
                                ) : (
                                    <Navigate to="/login" replace={true} />
                                )
                            }
                        />

                    </Routes>
                </BrowserRouter>
            </div>
            </Provider>
        </ThemeProvider>
  );
}

export default App;
