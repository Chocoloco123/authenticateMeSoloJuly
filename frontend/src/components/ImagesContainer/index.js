// import ImagesContainer from './ImagesContainer';

// export { ImagesContainer } from '/ImagesContainer';

// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

// Import the thunk creator
import { getImages } from '../../store/images';


const ImagesContainer = () => {
  // Declare variable from hooks
  const dispatch = useDispatch();
  // get images from our store
  const imagesObj = useSelector((state) => state.images);
  const images = Object.values(imagesObj);

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    // dispatches our thunk after the return part has been rendered for the first time
    dispatch(getImages()); 
  }, [dispatch]);

  return (
    <div>
      <h1 class='pageName'>Home</h1>
      {/* to image page */}
      {/* <div>
        {images.map((image) => )}
        <NavLink to={`images/${}`}
      </div> */}
      <div className='imgCont'>
        {images.map((image) => <img key={image.imageUrl} src={image.imageUrl} alt={image.imageTitle} className='homeImages'></img>)}
      </div>
    </div>
  );
};

export default ImagesContainer;