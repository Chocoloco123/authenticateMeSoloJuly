import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
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
    return dispatch(imageActions.addImages(newImage))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
    .then((res) => {
      if (!errors) history.push('/home');
    })
  };


  return (
    <div className='add-image'>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/home`} className='backBtnPhoto' >Back</NavLink>
      </div>
      <form onSubmit={handleSubmit} className='add-image editImgFormContainer'>
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