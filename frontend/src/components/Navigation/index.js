import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import IdyllicLogo from '../../media/IdyllicLogos/IdyllicLogo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="navbarItem">Log In</NavLink>
        {/* <NavLink to="/signup" className="navbarItem">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div className='boxAroundNav'>
      <div className='navDiv'>
        <img src={IdyllicLogo} className="loginLogo" alt="Idyllic logo"/>
        <ul className='navUl'>
          <li>
            <NavLink exact to="/home" className="navbarItem">Home</NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;