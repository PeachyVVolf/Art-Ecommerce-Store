import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    const [open, setOpen] = useState(false);

    let options = [];

    if(isAuthenticated){
        options = [
            { icon: <SearchIcon/>, name:"Search", func: search},
            { icon: <ShoppingCart style={{color:cartItems.length>0? "#AD0E82": "unset"}}/> , name:`Cart(${cartItems.length})`, func: cart},
            { icon: <PersonIcon/>, name: "Profile", func: account},
            { icon: <ListAltIcon/>, name: "Orders", func: orders},
            { icon: <ExitToAppIcon/>, name: "LogOut", func: logoutUser},
        ]
        if(user.role==="admin"){
            options.unshift(
                { icon: <DashboardIcon/>, name: "Dashboard", func: dashboard}, )
        }
    }
    else{
        options = [
            { icon: <SearchIcon/>, name:"Search", func: search},
            { icon: <ExitToAppIcon/>, name: "LogIn", func: login},
        ]
    }

    function search() {
        navigate('/search');
    }
    function login() {
        navigate("/login");
    }
    function cart() {
        navigate("/cart");
    }
    function dashboard() {
        navigate("/dashboard");
    }
    function account(){
        navigate("/account");
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logged Out Successfully");
    }
    function orders() {
        navigate("/orders");
    }

  return (
      <Fragment>
          <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction='down'
            className='speedDial'
            icon=
            {
                isAuthenticated ?
                    <img
                        className='speedDialIcon'
                         src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                        alt="Profile"
                    />
                :
                <img src='/Profile.png' alt="Profile" className='speedDialIcon' />
            }
          >
              {options.map((item) => (
                  <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth <= 600? true : false} onClick={item.func} /> 
              ))}
          </SpeedDial>
      </Fragment>
  )
}

export default UserOptions;