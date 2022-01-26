import { useEffect, useState } from 'react';
// Import hooks from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect, useParams, useHistory } from 'react-router-dom';
import { editAnAlbum, getAlbums } from '../../store/albums';

const AlbumEdit = () => {
  const params = useParams();
  const history = useHistory();
  const { albumId, albumName } = params;
  const sessionUser = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.albums);
  const album = albumsObj[albumId];

  const dispatch = useDispatch();
  const [title, setTitle] = useState(album?.title);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedAlbum = {
      userId: sessionUser.id,
      title
    }

    let theEditedAlbum = dispatch(editAnAlbum(album.id, album.title ,editedAlbum));

    if (theEditedAlbum) {
      history.push(`/albums`)
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
      <ul>
        {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <h2>Edit Album</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AlbumEdit;