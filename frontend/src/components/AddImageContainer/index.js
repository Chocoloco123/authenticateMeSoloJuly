import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import * as imageActions from '../../store/images';
import { getAlbums } from '../../store/albums';


// Import the thunk creator
// import { addImages } from '../../store/images';

const AddImage = () => {
  const [userId, setUserId] = useState('');
  const [albumId, setAlbumId] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.albums);
  const albumsArr = Object.values(albumsObj);
  const userAlbums = albumsArr.filter((obj) => obj.userId === sessionUser.id);
  console.log('userAlbs: ',userAlbums);
  console.log('ids: ', userAlbums[0])
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
      // imageUrl,
      image,
      imageTitle,
      content
    };

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

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const updateFile = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    // if (file.type.endsWith('png' || 'jpg' || 'jpeg')) {
      setImage(file);
      // setErrors([]);
    // } else {
    //   setErrors(['Must be a valid image file such as: png, jpg, or jpeg.']);
    // }
  };

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
          type='file'
          onChange={(e) => updateFile(e)}
          placeholder='Please upload file'
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
        <label htmlFor='album'>Album</label>
        <select name="albums" onChange={(e) => setAlbumId(e.target.value)}>
          <option defaultValue='' ></option>
          {userAlbums.map((albObj) => {
            return (
              <option key={albObj?.id} value={albObj?.id}>{albObj.title}</option>
            )
          })}
        </select>
        <div className='imageBtnsBox'>
          <button type='submit' className=' image-btn submitEditBtn'>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AddImage;