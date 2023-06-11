import React from "react";
import styles from './SignIn.module.css'
import TextField from "../../Common/View/TextField";
import Button from "../../Common/View/Button";

import {Box} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {loginAction} from "../../Store/actions/authAction";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const SignIn = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        values:{
            email:'',
            password:'',
        },
        touched : {},
        errors : {}
    });
    const [showPassword,setShowPassword] = React.useState({password:false});
    const stateHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevState)=>({
            ...prevState,
            values: {
                ...prevState.values,
                [name]: value,
            },
            touched: {
                ...prevState.touched,
                [name]: true,
            },
            errors: {
                ...prevState.errors,
                [name]: '' ,
            },
            [e.target.name] : e.target.value
        }))
    };

    const errorChecker = () => {
        let error ={
            email : ''
        };
        if(!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(formData?.values?.email)){
            error.email = 'please enter valid email'
        }
        setFormData((preVal)=>({...preVal, errors : error}));
    }

    const handleSignIn = () =>{
        errorChecker();
        if(Object.keys(formData.errors)?.every((key)=> formData?.errors[key] === '')){
            dispatch(loginAction({
                callBackFun : (res)=>{
                    console.log({res});
                    localStorage.setItem("token",res?.token);
                    navigate('/');
                },
                payload : formData?.values
            }))
        }
    }

    return(
        <div className={styles.container}>
            <Box className={styles.infoContainer} sx={{
                display : { lg : 'block', md:'none', sm : 'none', xs:'none'}
            }}>

            </Box>
            <Box className={styles.formContainer} sx={{ flex: {md : 1,sm : 1,xs : 1}}}>
                <div className={styles.formBox}>
                    <div className={styles.headingBox}>
                        <div className={styles.heading3}>Login to </div>
                        <div className={styles.contentText}>Enter your details below</div>
                    </div>

                    <div className={styles.fieldBox}>
                        Email
                        <TextField
                            fullWidth
                            name='email'
                            type='email'
                            value={formData?.values?.email}
                            onChange={stateHandler}
                            error={formData?.errors?.email}
                            helperText={formData?.errors?.email}
                        />
                    </div>
                    <div className={styles.fieldBox}>
                        Password
                        <TextField
                            fullWidth
                            name='password'
                            type={showPassword?.password ? 'text' : 'password'}
                            value={formData?.values?.password}
                            onChange={stateHandler}
                            // onClick={stateHandler}
                            error={formData?.errors?.password}
                            helperText={formData?.errors?.password}
                            InputProps={{
                                endAdornment : <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>setShowPassword((preVal)=> ({...preVal, password : !preVal.password}))}
                                        edge="end"
                                    >
                                        { showPassword?.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>

                    <div className={styles.checkBoxControler}>
                        <FormGroup >
                            <FormControlLabel sx={{'& .MuiFormControlLabel-label' :{ color:'#212B36'}}} control={<Checkbox defaultChecked />} label="Remember me" />
                        </FormGroup>
                        <div className={styles.forgotPassword}>Forgot password?</div>
                    </div>

                    <div className={styles.fieldBox}>
                        <Button
                            disabled={Object.keys(formData.values)?.some((key)=> formData.values[key] === '')}
                            fullWidth onClick={handleSignIn} >Login</Button>
                    </div>
                    <div>
                        Don't have account <span className={styles.linkText} onClick={()=> navigate('/sign-up')}>Sign Up</span>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default SignIn;