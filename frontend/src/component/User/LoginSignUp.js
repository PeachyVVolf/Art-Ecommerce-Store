import React, { Fragment, useRef, useState } from 'react';
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

const LoginSignUp = () => {

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

  const loginSubmit = () => {
    console.log("Log In");
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("Registered");
  };
  const registerDataChange = (e) => {
    if(e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }else{
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
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
                value='name'
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
                onChanage={registerDataChange}
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
  )
}

export default LoginSignUp