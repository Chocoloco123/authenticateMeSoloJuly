

// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

// Import the thunk creator
import { getImages } from '../../store/images';
import naturePhoto from '../../media/images/pexels-pixabay-206359_agy77s.jpg';
import githubLogo from '../../media/icons/GitHub-Mark-Light-32px.png'

const LandingContainer = () => {
  // Declare variable from hooks
  // const dispatch = useDispatch();
  // // get images from our store
  // const imagesObj = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user); // get session user
  // // console.log(sessionUser);
  // const images = Object.values(imagesObj);

  // // Use a 'react' hook and cause a side effect
  // useEffect(() => {
  //   // dispatches our thunk after the return part has been rendered for the first time
  //   dispatch(getImages()); 
  // }, [dispatch]);

  // ! use this for when you only want logged in user to access content
  if (sessionUser) return (
    <Redirect to="/home" />
  );

  return (
    <div className='landingContainer'>
      <div className='frontImgCont'>
        <img src={naturePhoto} className='frontImage' alt='naturePhoto'/>
        <div className='centerImg'>
          <h1 className='pageName titles'>Find inspiration in nature.</h1>
          <h4 className='landingText' >Join the Idyllic community and share the beauty of nature.</h4>
          <NavLink to="/signup" className=" signUpButtonFront">Sign Up</NavLink>
        </div>
      </div>
      <div className='landingBottom'>
        <a href='https://github.com/Chocoloco123/idyllicApp' className='landingBottom'>
          <img src={githubLogo} alt='githubLogo'></img>
        </a>
      </div>
    </div>
  );
};

export default LandingContainer;