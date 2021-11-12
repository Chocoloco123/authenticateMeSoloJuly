

// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

// Import the thunk creator
import { getImages } from '../../store/images';
import naturePhoto from '../../media/images/pexels-pixabay-206359_agy77s.jpg'

const LandingContainer = () => {
  // Declare variable from hooks
  const dispatch = useDispatch();
  // get images from our store
  const imagesObj = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user); // get session user
  // console.log(sessionUser);
  const images = Object.values(imagesObj);

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    // dispatches our thunk after the return part has been rendered for the first time
    dispatch(getImages()); 
  }, [dispatch]);

  // ! use this for when you only want logged in user to access content
  if (sessionUser) return (
    <Redirect to="/home" />
  );

  return (
    <div>
      <h1 className='pageName titles'>Find inspiration in nature.</h1>
      <h3 className='landingText' >Join the Idyllic community and share the beauty of nature.</h3>
      <div className='imgCont'>
        <img src={naturePhoto} className='frontImage' alt='naturePhoto'/>
      </div>
    </div>
  );
};

export default LandingContainer;