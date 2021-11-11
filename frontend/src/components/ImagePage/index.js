// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';

// Import the thunk creator
import { getImages } from '../../store/images';

const SingleImgCont = () => {
  const params = useParams();
  const { imageId } = params;
  // declare variable from hooks
  const dispatch = useDispatch();
  // get image from our store
  const imagesObj = useSelector((state) => state.images); 
  // get session user
  const sessionUser = useSelector((state) => state.session.user); // get session user
  
  // console.log('imagesObj: ', imagesObj);
  const images = Object.values(imagesObj);

  // console.log('images: ', images);
  
  const img = images.find((image) => +imageId === image.id);
  // console.log('imageId: ', imageId);
  
  // console.log('typeof imageId: ', typeof imageId);

  // console.log('img: ', img);

  console.log(sessionUser, sessionUser.id);
  console.log(img, img?.userId)
  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);
  return (
    <div>
      <div className='TitleName'>
        <h1 className='titles'>{img?.imageTitle}</h1>
      </div>
      <div className='singleImgContainer'>
        <img key={img?.imageUrl} 
        src={img?.imageUrl}
        alt={img?.imageTitle} className='singleImg'
        ></img>
      </div>
      <div className='imageBtnsBox'>
        {sessionUser && sessionUser.id === img?.userId &&
          <NavLink to={`/images/${img?.id}/edit`} className='image-btn' id='editBtn'>Edit Image</NavLink> 
        }
        {/* button for delete goes here */}
      </div>
      {/* <div className='descriptionBox'>
        <label for='description' className='descriptionTxt'>Description</label>
        <textarea className='descriptionTxtArea'></textarea>
      </div> */}
    </div>
  )
}

export default SingleImgCont;