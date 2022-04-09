import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

const ResetPassword = () => {
 
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const{ error, success, loading } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(params.token, myForm));
    };
    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Password Updated Successfully");
            navigate("/login");
        }   
    }, [dispatch, error, alert, navigate, success])
    
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="Reset Password" />
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Update Password</h2>
                            <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                                <div className='resetPassword'>
                                    <LockOpenIcon />
                                    <input
                                    type="password"
                                    placeholder='New Passowrd'
                                    required
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='resetPassword'>
                                    <LockIcon />
                                    <input
                                    type="password" 
                                    placeholder='Confirm Passowrd'
                                    required
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change Password"
                                    className='resetPasswordBtn'
                                />
                                </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

export default ResetPassword;