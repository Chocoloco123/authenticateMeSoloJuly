import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

import { getAlbums } from '../../store/albums';
import "./AlbumsPage.css"

const AlbumsPage = () => {
  const dispatch = useDispatch();
  const albumsObj = useSelector((state) => state?.albums);
  const sessionUser = useSelector((state) => state.session.user.id)
  
  const albumsArr = Object.values(albumsObj);
  
  const userAlbums = albumsArr.filter((album) => album.userId === sessionUser);

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch]);

  

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return(
    <div>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/home`} className='backBtnPhoto' >Back to Home</NavLink>
      </div>
      <h1>Albums</h1>
      { sessionUser && 
        <NavLink exact to="/albums/newAlbum" className="add-img-link image-btn">Add Album</NavLink>
      }
      <div>
        {userAlbums.map((album) => 
          <NavLink to={`/albums/${album?.id}/${album?.title}`} key={album?.id}>
            {album?.title}
          </NavLink>
        )}
      </div>
      
    </div>
  )
}

export default AlbumsPage;