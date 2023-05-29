import React from "react";
import {useNavigate} from "react-router";
/*-----------Component------------*/
import TextField from "../../Common/View/TextField";
import Button from "../../Common/View/Button";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useDispatch} from "react-redux";
import {signUpAction} from '../../Store/actions/authAction';
import styles from './SignUp.module.css'

const SignUp = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        values:{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        touched : {},
        errors : {}
    });
    const [showPassword,setShowPassword] = React.useState({password:false, confirmPassword : false});
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
        if(formData.values?.password !== formData.values?.confirmPassword){
            error.confirmPassword = 'password and confirm password must be same.'
            error.password = 'password and confirm password must be same.'
        }
        setFormData((preVal)=>({...preVal, errors : error}));
    }

    const handleSignUp = () =>{
        errorChecker();
        if(Object.keys(formData.errors)?.every((key)=> formData?.errors[key] === '')){
            dispatch(signUpAction({
                callBackFun : ()=>{navigate('/login')},
                payload : formData?.values
            }))
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.infoContainer}>

            </div>
            <div className={styles.formContainer}>
                <div className={styles.formBox}>
                    <div className={styles.headingBox}>
                        <div className={styles.heading3}>Sign up to </div>
                        <div className={styles.contentText}>Enter your details below</div>
                    </div>

                    <div className={styles.fieldBox}>
                        First Name
                        <TextField
                            fullWidth
                            name='firstName'
                            value={formData?.values?.firstName}
                            onChange={stateHandler}
                            // onClick={stateHandler}
                            error={formData?.errors?.firstName}
                            helperText={formData?.errors?.firstName}
                        />
                    </div>
                    <div className={styles.fieldBox}>
                        Last Name
                        <TextField
                            fullWidth
                            name='lastName'
                            value={formData?.values?.lastName}
                            onChange={stateHandler}
                            // onClick={stateHandler}
                            error={formData?.errors?.lastName}
                            helperText={formData?.errors?.lastName}
                        />
                    </div>
                    <div className={styles.fieldBox}>
                        Email
                        <TextField
                            fullWidth
                            name='email'
                            type='email'
                            value={formData?.values?.email}
                            onChange={stateHandler}
                            // onClick={stateHandler}
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
                    <div className={styles.fieldBox}>
                        Confirm Password
                        <TextField
                            fullWidth
                            name='confirmPassword'
                            type={showPassword?.confirmPassword ? 'text' : 'password'}
                            value={formData?.values?.confirmPassword}
                            onChange={stateHandler}
                            // onClick={stateHandler}
                            error={formData?.errors?.confirmPassword}
                            helperText={formData?.errors?.confirmPassword}
                            InputProps={{
                                endAdornment : <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>setShowPassword((preVal)=> ({...preVal, confirmPassword : !preVal.confirmPassword}))}
                                        edge="end"
                                    >
                                        { showPassword?.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>

                    <div className={styles.fieldBox}>
                        <Button
                            fullWidth
                            disabled={Object.keys(formData.values)?.some((key)=> formData.values[key] === '')}
                            onClick={handleSignUp}
                        >Sign Up</Button>
                    </div>
                    <div>
                        already have account <span className={styles.linkText} onClick={()=> navigate('/login')}>Sign In</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;