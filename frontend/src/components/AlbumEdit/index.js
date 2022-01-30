import { useEffect, useState } from 'react';
// Import hooks from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect, useParams, useHistory } from 'react-router-dom';
import { editAnAlbum, getAlbums } from '../../store/albums';
import './AlbumEdit.css';

const AlbumEdit = () => {
  const params = useParams();
  const history = useHistory();
  const { albumId, albumName } = params;
  const sessionUser = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.albums);
  const album = albumsObj[albumId];

  const dispatch = useDispatch();
  const [title, setTitle] = useState(album?.title ? album?.title : '');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const validationErrors = [];
    if (!title || title === '' || title.trim() === '') validationErrors.push("please submit a title")
    if (title?.length < 2 || title?.length > 100) validationErrors.push('Please submit a title between 2 to 100 characters')

    setErrors(validationErrors)
  }, [title])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedAlbum = {
      userId: sessionUser.id,
      title
    }

    if (!errors.length) {
      let theEditedAlbum = dispatch(editAnAlbum(album.id, album?.title ,editedAlbum));

      if (theEditedAlbum) {
        history.push(`/albums`)
      }
    }
  }

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch, album?.title])

  useEffect(() => {
    if (album) {
      setTitle(album?.title)
    }
  }, [album])

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/albums/${albumId}/${albumName}`} className='backBtnPhoto' >Back to Album</NavLink>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className='pageName titles'>Edit Album</h2>
        <ul>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          className='albumEditInput'
          required
          />
        <button type='submit' className=' image-btn submitEditBtn'>Submit</button>
      </form>
    </div>
  )
}

export default AlbumEdit;