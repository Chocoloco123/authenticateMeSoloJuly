import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import * as importActions from '../../store/albums';

const addAlbum = () => {
  const [title, setTitle] = useState('');

  return (
    <div>
      'hello world';
    </div>
  )
}

export default addAlbum;