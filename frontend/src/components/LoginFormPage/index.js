import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { IdyllicLogo } from '../../media/Green Arrows Environment Logo/5.png'
import IdyllicLogo from '../../media/IdyllicLogos/IdyllicLogo.png'
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/home" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    setCredential('DemoUser');
    setPassword('password');
    dispatch(sessionActions.login({
      credential, password
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='formContainer'>

        {/* <img src={IdyllicLogo} class="loginLogo" alt="Idyllic logo"/> */}
        <div className='loginTitleDiv'>
          <h1 className='titles login'>Login</h1>
        </div>
        <ul className='loginErrorList'>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className='authInputs'
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='authInputs'
          />
        </label>
        <div className='signupLoginBtn'>
          <button type="submit" className='signupLoginSubmit'>Log In</button>
          <button onClick={handleDemoLogin} type="submit" className='signupLoginSubmit'>Demo</button>
        </div>
      </div>
    </form>
  );
}

export default LoginFormPage;