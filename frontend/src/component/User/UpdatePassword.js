import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const{ error, isUpdated, loading } = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(updatePassword(myForm));
    };
    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Password Updated Successfully");
            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }   
    }, [dispatch, error, alert, navigate, isUpdated])
    
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="Update Password" />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                            <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                                <div className='updatePassword'>
                                    <VpnKeyIcon />
                                    <input
                                    type="password"
                                    placeholder='Old Passowrd'
                                    required
                                    name='oldPassword'
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className='updatePassword'>
                                    <LockOpenIcon />
                                    <input
                                    type="password"
                                    placeholder='New Passowrd'
                                    required
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className='updatePassword'>
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
                                    className='updatePasswordBtn'
                                />
                                </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default UpdatePassword;