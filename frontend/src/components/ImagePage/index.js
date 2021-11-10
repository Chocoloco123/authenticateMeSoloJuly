// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

// Import the thunk creator
import { getImages } from '../../store/images';

const SingleImgCont = ({ imageId }) => {
  // declare variable from hooks
  const dispatch = useDispatch();
  // get image from our store
  const imagesObj = useSelector((state) => state.images); 
  // const imagesObj = useSelector((state) => {
  //   return images.find((id => state.imagesObj[]))
  // }
  console.log('imagesObj: ', imagesObj);
  const images = Object.values(imagesObj);
  // const myImage = imagesObj.find((id) => id === imagesObj.id)
  const img = images.find((id) => images.id === imageId);
  // const img = images.find((id) => id == imageId);
  console.log('imageId: ', imageId);
  console.log('image: ',img);
  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);
  return (
    // {oneImg.findOne((imageId))}
    // <div>
    //   <NavLink to={`/images/${img}`}>
    //     <img key={img.imageUrl} 
    //         src={img.imageUrl} 
    //         alt={img.imageTitle} 
    //         className='homeImages'></img>
    //   </NavLink>
    // </div>
    <div>
      <img key={img.imageUrl} 
      src={img.imageUrl}
      alt={img.imageTitle}
      ></img>
    </div>
  )
}

export default SingleImgCont;