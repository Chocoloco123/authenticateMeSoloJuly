import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import IdyllicLogo from '../../media/idyllic-new/idyllicLogoNewLargeBlack.png'
import SearchBar from '../search/SearchBar';

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
    <header className='navItemsCont'>
      <div className='logoBoxDiv'>
        <a href='/' className='logoLink'>
          <img src={IdyllicLogo} className="loginLogo" alt="Idyllic logo"/>
        </a>
        <div className='navSearchNLinks'>  
          {sessionUser ? <SearchBar /> : null}
          <div className='navDiv'>
            <NavLink exact to="/home" className="navbarItem" id='navbarItemLeft'>Home</NavLink>
            {sessionUser ?
            <NavLink exact to="/albums" className="navbarEl" id='navbarItemLeft'>Albums</NavLink>
            : null
            }
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;