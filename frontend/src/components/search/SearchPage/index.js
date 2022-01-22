import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { searchForImage } from "../../../store/search"
import { useParams, NavLink } from 'react-router-dom'

import './SearchPage.css'

const SearchedImagePage = () => {
  const searchData = useSelector((state) => state?.searchRes)
  const dispatch = useDispatch();

  const { searched } = useParams();
  useEffect(() => {
    dispatch(searchForImage(searched))
  }, [dispatch, searched])


  if (!searchData?.images) {
    return null;
  }

  const images = Object.values(searchData?.images);
  
  if (!images.length) {
    return (<h1 className="searchResTitle">No Images found for "{searched}"</h1>)
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