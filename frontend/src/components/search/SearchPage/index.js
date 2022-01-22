import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { searchForImage } from "../../../store/search"
import { useParams, NavLink, Redirect } from 'react-router-dom'

import './SearchPage.css'

const SearchedImagePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const images = useSelector((state) => state?.searchResult)

  const dispatch = useDispatch();

  const { searched } = useParams();
  useEffect(() => {
    dispatch(searchForImage(searched))
  }, [dispatch, searched])

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  // if (!images?.length) {
  //   return null;
  // }
  
  if (!images.length) {
    return (<h1 className="searchResTitle">No images found for "{searched}"</h1>)
  } else {
    return (
      <div className="searchResults-Content">
        <div className="SearchTitleDiv"><h1 className="searchResTitle">Search Results For "{searched}"</h1></div>
        <div className='imgCont'>
        {images.map((image) => 
        // key must be unique!
        <NavLink to={`/images/${image.id}`} key={image.id} className='homeImages-anchor'>
          <img 
            src={image.imageUrl} 
            alt={image.imageTitle} 
            className='homeImages'>
          </img>
        </NavLink>
        )}
      </div>
      </div>
    )
  }
}

export default SearchedImagePage;