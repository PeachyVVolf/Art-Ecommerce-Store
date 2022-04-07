import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import neonLeaf from '../../images/neonLeaf.png';
import neonLips from '../../images/neonLips.png';
import neonSkull from '../../images/neonSkull.png';
import neonDonut from '../../images/neonDonut.png';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const LoginSignUp = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const{ error, loading, isAuthenticated } = useSelector(state => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password} = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/neonTriangle.png");

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if(tab === "login"){
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if(tab === "register"){
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isAuthenticated){
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate])
  

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if(e.target.name === "avatar") {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        setAvatar(e.target.result);
        setAvatarPreview(e.target.result);
      };

      reader.readAsDataURL(file);
      
    }else{
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ?
        <Loader />
      :
        <Fragment>
        <div className='LoginSignUpContainer'>
          {/* Neon Leaves */}
          <div>
            <div className='neonLeaf'>       
              <img src={neonDonut} alt='neonLeaf' width='200px'/>
            </div>
            <div className='neonLeaf1'>       
              <img src={neonSkull} alt='neonLeaf' width='160px'/>
            </div>
            <div className='neonLeaf2'>       
              <img src={neonLeaf} alt='neonLeaf' width='200px'/>
            </div>
            <div className='neonLeaf3'>       
              <img src={neonLips} alt='neonLeaf' width='200px'/>
            </div>
            <div className='neonLeaf4'>       
              <img src={neonLeaf} alt='neonLeaf' width='200px'/>
            </div>
          </div>
          <div className='LoginSignUpBox'>
            <div>
              <div className='login_signUp_toggle'>
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
                <button className='switcherBtn' ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className='loginEmail'>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder='Email'
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className='loginPassword'>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder='Passowrd'
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password?</Link>
              <input type="submit" value="Login" className='loginBtn' />
            </form>
            <form className='signUpForm' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
              <div className='signUpName'>
                <FaceIcon />
                <input
                  type="text"
                  placeholder='Name'
                  required
                  name='name'
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className='signUpEmail'>
                <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={registerDataChange}
                  />
              </div>
              <div className='signUpPassword'>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder='Passowrd'
                  required
                  name='password'
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div id='registerImage'>
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className='signUpBtn'
              />
            </form>
          </div>
        </div>
        </Fragment>
      }
    </Fragment>
  )
}

export default LoginSignUp