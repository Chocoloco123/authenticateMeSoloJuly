
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';


// Import the thunk creator
import { editImage, getImages } from '../../store/images';

const EditImage = () => {
  const params = useParams();
  const { imageId } = params;
  // declare variable from hooks
  const dispatch = useDispatch();
  // get image from our store
  const imagesObj = useSelector((state) => state.images); 
  // console.log(imagesObj);
  const images = Object.values(imagesObj);
  
  const img = images.find((image) => +imageId === image.id);
  console.log('img: ', img);

  const [imageTitle, setImageTitle] = useState(img?.imageTitle);
  const [content, setContent] = useState(img?.content);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const imgData = {
      imageTitle,
      content
    };
    dispatch(editImage(imageId, imgData));
    // take the user back to home
    history.push(`/images/${imageId}`);
  };

  useEffect(() => {
    dispatch(getImages())
    // ! keep a watch on this one!
    // on page useStates work but on refresh the inputs are not there anymore
  // }, [dispatch, images?.length])
  }, [dispatch, img?.content])

  useEffect(() => {
    if (img) {
      setImageTitle(img.imageTitle);
      setContent(img.content);
    }
  }, [img])

  return (
    <div>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/images/${imageId}`} className='backBtnPhoto' key={imageId}>Back</NavLink>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='editImgFormContainer'>
        <h1 className='titles'>Edit Image</h1>
        <label htmlFor='Title' className='labels editImgLabel'>Title</label>
          <input onChange={e => setImageTitle(e.target.value)} value={imageTitle}
          placeholder='Title'></input>
        <label htmlFor='Description' className='labels editImgLabel'>Description</label>
          <textarea onChange={e => setContent(e.target.value)} value={content} placeholder='Description' className='descriptionTxtArea'></textarea>
        <div className='imageBtnsBox'>
          <button type='submit' className=' image-btn submitEditBtn'>Submit</button>
        </div>
      </form>
    </div>

  );
};
export default EditImage;




// import { useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';
// // Import hooks from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
// import { NavLink, useParams } from 'react-router-dom';
// import { EditFormContext } from '../../Context/EditFormContext';


// // Import the thunk creator
// import { editImage, getImages } from '../../store/images';

// const EditImage = () => {
//   // const params = useParams();
//   // const { imageId } = params;
//   // // declare variable from hooks
//   // const dispatch = useDispatch();
//   // // get image from our store
//   // const imagesObj = useSelector((state) => state.images); 
//   // // console.log(imagesObj);
//   // const images = Object.values(imagesObj);
  
//   // const img = images.find((image) => +imageId === image.id);
//   // console.log('img: ', img);

//   // const [imageTitle, setImageTitle] = useState(img?.imageTitle);
//   // const [content, setContent] = useState(img?.content);
//   const { imageTitle } = useContext(EditFormContext);
//   const { content } = useContext(EditFormContext);

//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const imgData = {
//       imageTitle,
//       content
//     };
//     dispatch(editImage(imageId, imgData));
//     // take the user back to home
//     history.push(`/images/${imageId}`);
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const imgData = {
//   //     imageTitle,
//   //     content
//   //   };
//   //   dispatch(editImage(imageId, imgData));
//   //   // take the user back to home
//   //   history.push(`/images/${imageId}`);
//   // };
//   useEffect(() => {
//     dispatch(getImages())
//     // ! keep a watch on this one!
//     // on page useStates work but on refresh the inputs are not there anymore
//   // }, [dispatch, images?.length])
//   }, [dispatch])

//   // useEffect(() => {
//   //   dispatch(getImages())
//   //   // ! keep a watch on this one!
//   //   // on page useStates work but on refresh the inputs are not there anymore
//   // // }, [dispatch, images?.length])
//   // }, [dispatch, img?.content])

//   return (
//     <form onSubmit={(e) => handleSubmit(e)} className='editImgFormContainer'>
//       <h1 className='titles'>Edit Image</h1>
//       <label htmlFor='Title' className='labels editImgLabel'>Title</label>
//         <input onChange={e => setImageTitle(e.target.value)} value={imageTitle}
//         placeholder='Title'></input>
//       <label htmlFor='Description' className='labels editImgLabel'>Description</label>
//         <textarea onChange={e => setContent(e.target.value)} value={content} placeholder='Description' className='descriptionTxtArea'></textarea>
//       <div className='imageBtnsBox'>
//         <button type='submit' className=' image-btn submitEditBtn'>Submit</button>
//       </div>
//     </form>
//   );
// };
// export default EditImage;