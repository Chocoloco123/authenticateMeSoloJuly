import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { getAlbums } from '../../store/albums';

// import { getAlbums } from '../../store/albums';

import './AlbumImagePage.css'

const AlbumImagesPage = () => {
  const dispatch = useDispatch();
  const imagesObj = useSelector((state) => state.images)
  const albumsObj = useSelector((state) => state.albums);
  console.log('this is albumsObj: ', albumsObj)
  const imagesArr = Object.values(imagesObj);
  const params = useParams();
  const { albumName, albumId } = params;

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])

  return(
    <div>
      <h2>{albumName}</h2>
      <div>
        <NavLink to={`/albums/${albumId}/${albumName}/edit`}>Edit</NavLink>
      </div>
      <div>
        {imagesArr.length < 0 ? 'hello world' : 'empty' }
      </div>
    </div>  
  )
}

export default AlbumImagesPage;