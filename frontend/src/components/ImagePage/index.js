// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom';

// Import the thunk creator
import { getImages, deleteImage } from '../../store/images';

const SingleImgCont = () => {
  const history = useHistory();
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

  console.log('img: ', img);

  // console.log(sessionUser, sessionUser.id);
  // console.log(img, img?.userId)

  const handleDelete = async(imageId) => {
    await dispatch(deleteImage(imageId));
    history.push(`/home`)
  }

  useEffect(() => {
    dispatch(getImages());
    // dispatch(deleteImage(img.id))
  // }, [dispatch, img?.id]);
  }, [dispatch]);
  return (
    <div>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/home`} class='backBtnPhoto' >Back</NavLink>
      </div>
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
          <NavLink to={`/images/${img?.id}/edit`} className='image-btn' id='editBtn'>Update</NavLink> 
        }
        {/* button for delete goes here */}
        <button onClick={() => handleDelete(img?.id)} className='deleteBtn submitEditBtn image-btn'>Delete</button>
      </div>
      <div className='descriptionBox'>
        <label for='description' className='descriptionTxt'>Description</label>
        <div className='descriptionContBox'>
          <p>
            {img?.content}
          </p>
        </div>
      </div> 
    </div>
  )
}

export default SingleImgCont;