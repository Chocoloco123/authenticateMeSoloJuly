import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

import { getAlbums } from '../../store/albums';
import { getImages } from '../../store/images';
import "./AlbumsPage.css"

const AlbumsPage = () => {
  const dispatch = useDispatch();
  const albumsObj = useSelector((state) => state?.albums);
  const sessionUser = useSelector((state) => state.session.user.id);
  const imagesObj = useSelector((state) => state.images);
  
  
  const albumsArr = Object.values(albumsObj);
  const imagesArr = Object.values(imagesObj);


  const userAlbums = albumsArr.filter((album) => album.userId === sessionUser);
  console.log('this is userAlbums: ',userAlbums)

  /* 
  plan:
  [] iterate through albums to get album id
  [] iterate through images array to see get an array of photos in each album
  [] get the first photo in that album
  [] put it as the album cover 
  [] else style a blank album cover
  */

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])

  

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return(
    <div>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/home`} className='backBtnPhoto' >Back to Home</NavLink>
      </div>
      <h1 className='pageName titles'>Albums</h1>
      { sessionUser && 
        <NavLink exact to="/albums/newAlbum" className="add-img-link image-btn">Add Album</NavLink>
      }
      <div className='imgCont'>
        {userAlbums.map((album) => 
          <NavLink to={`/albums/${album?.id}/${album?.title}`} key={album?.id} className='homeImages'>
            <div>{album?.title}</div>
          </NavLink>
        )}
      </div>
      
    </div>
  )
}

export default AlbumsPage;