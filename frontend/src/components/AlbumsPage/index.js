import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom';

import { getAlbums } from '../../store/albums';
import "./AlbumsPage.css"

const AlbumsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const albumsObj = useSelector((state) => state.albums);
  console.log('this is albums',albumsObj);

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])

  return(
    'Hello world'
    // <div>

    // </div>
  )
}

export default AlbumsPage;