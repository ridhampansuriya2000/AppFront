import React, {Component} from "react";
import styles from './Content.module.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Content = ({routes}) => {
    return (
        <div className={styles.main}>
            <Routes>
                {routes?.map((Component)=>{
                    return <Route path={Component.path} ecxet  element={Component.component}/>
                })}
            </Routes>
        </div>
    )
}

export default Content;