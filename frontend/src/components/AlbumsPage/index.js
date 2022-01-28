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
  // console.log(imagesArr);


  const userAlbums = albumsArr.filter((album) => album.userId === sessionUser);
  // console.log('this is userAlbums: ',userAlbums)
  const albumIds = userAlbums.map((obj) => obj.id);
  // console.log(albumIds);

  const firstImgs = {}
  albumIds.map((el) => {
    if (!firstImgs[el]) {
      const albumImagesArr = imagesArr.filter((obj) => (
        obj?.albumId === +el
      ));
      // console.log('albImagesArr: ',albumImagesArr);
      if (albumImagesArr.length) {
        firstImgs[el] = albumImagesArr[0].imageUrl; // null will be the first image of each album, going to have to iterate again but through images
      }
    }
    return firstImgs;
  });
  // const firstImgsArr = Object.values(firstImgs);
  // console.log(firstImgs)
  // console.log(firstImgsArr);


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
          <NavLink to={`/albums/${album?.id}/${album?.title}`} key={album?.id} className='homeImages albumTitleLink'>
            <div className='albumImages-Div-Box'>
              <div className='albumTitle-div albumImages-Div-Box'>{album?.title}</div>
              {firstImgs[album?.id] ? 
                <img src={firstImgs[album?.id]} alt="album cover" className='albumCover-Img'></img> 
                : <img src='https://res.cloudinary.com/dsz4sha80/image/upload/v1643348439/Idyllic_Logo_axyrx3.png' alt='default cover' className='albumCover-Img-default'></img>
              }
            </div>
          </NavLink>
        )}
        
      </div>
      
    </div>
  )
}

export default AlbumsPage;