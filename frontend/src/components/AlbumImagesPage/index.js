import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';

// import { getAlbums } from '../../store/albums';

import './AlbumImagePage.css'

const AlbumImagesPage = () => {
  const imagesObj = useSelector((state) => state.images)
  const imagesArr = Object.values(imagesObj);

  return(
    <div>
      {imagesArr.length < 0 ? 'hello world' : 'empty' }
    </div>
    
  )
}

export default AlbumImagesPage;