import React from "react";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import {styled} from "@mui/material";

const CssTextField = styled(TextField)({
    '& .MuiInput-underline:after': {
        borderBottomColor: 'unset',
    },
    '& .MuiInputBase-root':{
        borderRadius:'7px',
    },
    '.MuiFormLabel-root':{
        color: '#A0AAB4',
    },
    '& label.Mui-focused': {
        color:'#1976d2',
    },'& label.Mui-error': {
        color:'#e24646',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius:'7px',
        '& fieldset': {
            // borderColor: '#E0E3E7',
        },
        '&.Mui-focused fieldset': {
            // borderColor: 'unset',
        },
        '&:hover fieldset': {
            // borderColor: 'unset',
        },
    },
});


const TextFieldView = ({...props}) =>{
    return(
        <CssTextField id="custom-css-outlined-input" {...props} />
    )
}

export default TextFieldView;