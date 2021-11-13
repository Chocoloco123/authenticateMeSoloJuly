import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, Redirect } from 'react-router-dom';
import * as imageActions from '../../store/images';


// Import the thunk creator
import { addImages } from '../../store/images';

const AddImage = () => {
  const [userId, setUserId] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newImage = {
  //     userId,
  //     albumId,
  //     imageUrl,
  //     imageTitle,
  //     content
  //   };
  //   dispatch(addImages(newImage));
  //   // take the user back to home
  //   history.push('/home');
  // };



  const handleSubmit = (e) => {
    e.preventDefault();
    const newImage = {
      userId,
      albumId,
      imageUrl,
      imageTitle,
      content
    };

    // const preErrorsArr = [];

    // if (!imageUrl.startsWith('https') || imageUrl === '') {
    //   // happy
    //   preErrorsArr.push('Please provide a URL for your image.');
    // }

    // if ((!imageTitle.length > 2 && !imageTitle.length < 150)) {
    //   preErrorsArr.push('Please provide a title with a length between 2 - 150 characters.');
    // } 

    // if (!content.length || content === '') {
    //   preErrorsArr.push('Please provide a description.');
    // }
  

    // setErrors([...preErrorsArr]);
    // // errors.push(...preErrorsArr);
    // console.log('errors: ', errors);
    // console.log('preErrorsArr: ', preErrorsArr);

    // if (preErrorsArr.length < 1) {
    //   dispatch(imageActions.addImages(newImage));
    //   console.log('hit the final if statement!!!!!!!')
    //   history.push('/home');
    // }

    
    
  
    
      // console.log('data: ', data)
      
    
    // dispatch(imageActions.addImages(newImage))
    // .then(() => {
    //   console.log('errors: ', errors);
    
    //   if (errors.length === 0) history.push('/home')
    // })
    // .catch(async (res) => {
    //   const data = await res.json();
    //   // console.log('data: ', data)
    //   if (data && data.errors) {
    //     setErrors(data.errors) 
    //   } 
    // })
    
    // console.log('imageTitle', imageTitle);
    return dispatch(imageActions.addImages(newImage))
    .then((res) => {
      // console.log('this is res: ', res);
      if (res.ok) {
        setErrors([]);
        history.push('/home');
      }
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  };

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className='add-image'>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/home`} className='backBtnPhoto' >Back</NavLink>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='add-image editImgFormContainer'>
      <h2 >Add An Image</h2>
        <ul className='loginErrorsList'>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <label htmlFor='imageUrl' className='editImgLabel'>Image Url</label>
        <input
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder='Image Url'
        />
        <label htmlFor='imageTitle' className='editImgLabel'>Image Title</label>
        <input
          onChange={(e) => setImageTitle(e.target.value)}
          value={imageTitle}
          placeholder='Image Title'
        />
        <label htmlFor='description' className='editImgLabel'>Description</label>
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='Description'
        />
        <div className='imageBtnsBox'>
          <button type='submit' className=' image-btn submitEditBtn'>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AddImage;