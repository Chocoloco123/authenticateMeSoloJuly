import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import * as albumActions from '../../store/albums';
import { addAnAlbum } from '../../store/albums';

const AddAlbum = () => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlb = {
      userId: sessionUser.id,
      title
    }

    // if (!errors.length) {
      let theNewAlbum = await dispatch(addAnAlbum(newAlb));

      if (theNewAlbum) {
        history.push(`/albums`)
      }
    // }
    
  }

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div>
      <ul>
        {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <h2>Add Album</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddAlbum;