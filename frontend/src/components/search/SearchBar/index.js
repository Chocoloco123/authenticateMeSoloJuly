import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchForImage } from '../../../store/search'
import { useHistory } from 'react-router';
import './SearchBar.css';


const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState('');
  
  const handleEnter = async(e) => {
    if (e.key === "Enter" && search.trim() === '') {
      e.preventDefault();

      history.push("/")
      setSearch('')
    } else if (e.key === 'Enter') {
      e.preventDefault();
      let data = await dispatch(searchForImage(search));
  
      if (data) {
        history.push(`/search/${search}`)
      }
      setSearch('')
    }
  }

  const handleSearchClick = async(e) => {
    e.preventDefault();

    if (search.trim() === '') {
        history.push('/home')
        setSearch('')
      } else {

        let data = await dispatch(searchForImage(search));
      
        if (data) {
          history.push(`/search/${search}`)
        }
        setSearch('')
      }
  }

  return (
    <form className='searchForm'>
      <div className='searchBarCont'>
        <div>
        <button type="submit" className="searchBtn" onClick={(e) => handleSearchClick(e)}><i className="fas fa-search fa-lg"></i></button>
        </div>
        <input
          type='text'
          placeholder='Idyllic landscapes and nature awaits...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
          className='searchBar'
          >
        </input>
      </div>
    </form>
  )
}

export default SearchBar;
