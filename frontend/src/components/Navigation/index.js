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
        <NavLink to="/login" class="navbarItem">Log In</NavLink>
        <NavLink to="/signup" class="navbarItem">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div class='boxAroundNav'>
      <div class='navDiv'>
        <img src={IdyllicLogo} class="loginLogo" alt="Idyllic logo"/>
        <ul class='navUl'>
          <li>
            <NavLink exact to="/" class="navbarItem">Home</NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;