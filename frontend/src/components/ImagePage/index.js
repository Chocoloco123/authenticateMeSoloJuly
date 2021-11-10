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

  // THIS ONE!
  const img = images.find((id) => images.id === imageId);

  // const newimg = images.find((id) => {
  //   console.log(typeof id, id);
  //   console.log(typeof imageId)
  // })
  // return newimg;
  console.log('typeof id: ',typeof id);
  console.log('typeof imageId: ', typeof imageId);
  // const img = imagesObj.find((id) => id === imagesObj.id);
  console.log('img: ', img);

  // const img = images.find((id) => id == imageId);
  // console.log('imageId: ', imageId);
  // console.log('image: ',img);



  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);
  return (
    // <div>
    //   <img key={img.imageUrl} 
    //   src={img.imageUrl}
    //   alt={img.imageTitle} className='singleImg'
    //   ></img>
    // </div>
    <div>
      <div className='singleImgContainer'>
        <img key={img.imageUrl} 
        src={img.imageUrl}
        alt={img.imageTitle} className='singleImg'
        ></img>
      </div>
    </div>
  )
}

export default SingleImgCont;