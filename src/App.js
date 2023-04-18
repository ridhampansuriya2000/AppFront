
import './App.css';
import Layout from "./Layout";
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./styles/theme";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {/*<Layout/>*/}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<AboutUs />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
  );
}

export default App;
