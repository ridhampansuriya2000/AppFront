import React from "react";
import Button from '@mui/material/Button';
import {styled} from "@mui/material";

const CssButton = styled(Button)({
// #515989
   '&.MuiButton-text':{
       color:'#ffffff',
   },
    // '&.Mui-disabled':{
    //    backgroundColor:'#7cbeff'
    // },
    "&.MuiButton-root":{
       height:'min-Content',
        backgroundColor:'#515989',
        '&.Mui-disabled':{
            backgroundColor:'#a1a7ce',
            // color:'#000000',
        },
    },
    '&.MuiButton-outlined':{
       backgroundColor:'#ffffff'
    }
});


const ButtonView = ({...props}) =>{
    return(
        <CssButton id="custom-css-outlined-input" {...props} />
    )
}

export default ButtonView;