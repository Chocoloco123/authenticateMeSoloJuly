

// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

// Import the thunk creator
import { getImages } from '../../store/images';


const ImagesContainer = () => {
  // Declare variable from hooks
  const dispatch = useDispatch();
  // get images from our store
  const imagesObj = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user); // get session user
  console.log(sessionUser);
  const images = Object.values(imagesObj);

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    // dispatches our thunk after the return part has been rendered for the first time
    dispatch(getImages()); 
  }, [dispatch]);

  // ! use this for when you only want logged in user to access content
  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div>
      <h1 className='pageName titles'>Image Feed</h1>
      { sessionUser && 
        <NavLink exact to="/images/addImage" className="add-img-link">Add Image</NavLink>
      }
      <div className='imgCont'>
        {images.map((image) => 
        // key must be unique!
        <NavLink to={`/images/${image.id}`} key={image.id} >
          <img 
            src={image.imageUrl} 
            alt={image.imageTitle} 
            className='homeImages'>
          </img>
        </NavLink>

        )}
      </div>
    </div>
  );
};

export default ImagesContainer;