import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import IdyllicLogo from '../../media/idyllic-new/idyllicLogoNewLargeBlack.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <NavLink to="/login" className="navbarItem" id='navbarItemRight'>Log In</NavLink>
    );
  }

  return (
    <div className='boxAroundNav'>
      <a href='/' className='logoLink'>
        <img src={IdyllicLogo} className="loginLogo" alt="Idyllic logo"/>
      </a>
      <div className='navDiv'>
        <NavLink exact to="/home" className="navbarItem" id='navbarItemLeft'>Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>

    // <div className='boxAroundNav'>
    //   <div className='navDiv'>
    //     <img src={IdyllicLogo} className="loginLogo" alt="Idyllic logo"/>
    //     <ul className='navUl'>
    //       <li>
    //         <NavLink exact to="/home" className="navbarItem">Home</NavLink>
    //         {isLoaded && sessionLinks}
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
}

export default Navigation;