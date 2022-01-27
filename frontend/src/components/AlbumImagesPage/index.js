import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { deleteAnAlbum, getAlbums } from '../../store/albums';
import { getImages } from '../../store/images';

import './AlbumImagePage.css'

const AlbumImagesPage = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { albumName, albumId } = params;
  const imagesObj = useSelector((state) => state.images);
  const imagesArr = Object.values(imagesObj);
  
  const albumImagesArr = imagesArr.filter((obj) => (
    obj?.albumId === +albumId
  ));
  console.log(albumImagesArr)

  const albumsObj = useSelector((state) => state.albums);
  
  const sessionUser = useSelector((state) => state.session.user);
  const albumTitle = albumsObj[albumId]?.title;
  const theAlbumId = albumsObj[albumId];
  // console.log('theAlbumId: ',theAlbumId)
  

  const handleDelete = async(albumId) => {
    await dispatch(deleteAnAlbum(albumId));
    history.push('/albums')
  }
  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])

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
        {albumImagesArr.map((obj) => 
          <div key={"albumImgDiv"+obj.id}>
            <NavLink to={`/images/${obj?.id}`} key={obj.id}>
              <img 
            src={obj.imageUrl} 
            alt={obj.imageTitle} 
            className='homeImages'>
          </img>
            </NavLink>
          </div>
        )}
      </div>
    </div>  
  )
}

export default AlbumImagesPage;