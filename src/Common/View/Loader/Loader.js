import React from "react";
import styles from "./Loader.module.css";
import {CircularProgress} from "@mui/material";

const Loader = ({color="inherit"}) =>{
    return(
        <div className={`${styles.mainWrapper}`}>
            <div className={`${styles.loader}`}>
                <CircularProgress size={50} color={color} />
            </div>
        </div>
    )
}

export default Loader;