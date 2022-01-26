import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { deleteAnAlbum, getAlbums } from '../../store/albums';

// import { getAlbums } from '../../store/albums';

import './AlbumImagePage.css'

const AlbumImagesPage = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const imagesObj = useSelector((state) => state.images)
  const albumsObj = useSelector((state) => state.albums);
  const sessionUser = useSelector((state) => state.session.user);
  const { albumName, albumId } = params;
  const albumTitle = albumsObj[albumId]?.title;
  const theAlbumId = albumsObj[albumId];
  // console.log('theAlbumId: ',theAlbumId)
  
  const imagesArr = Object.values(imagesObj);

  const handleDelete = async(albumId) => {
    await dispatch(deleteAnAlbum(albumId));
    history.push('/albums')
  }

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch]);

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return(
    <div>
      <h2>{albumTitle}</h2>
      <div>
        <NavLink to={`/albums/${albumId}/${albumName}/edit`}>Edit</NavLink>
      </div>
      <div>
        <button onClick={() => handleDelete(theAlbumId?.id)}>Delete</button>
      </div>
      <div>
        {imagesArr.length < 0 ? 'hello world' : 'empty' }
      </div>
    </div>  
  )
}

export default AlbumImagesPage;