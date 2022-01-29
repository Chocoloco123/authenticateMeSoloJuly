import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const validationErrors = [];
    if (!title || title === '' || title.trim() === '') validationErrors.push("please submit a title")
    if (title.length < 2 || title.length > 100) validationErrors.push('Please submit a title between 2 to 100 characters')

    setErrors(validationErrors)
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlb = {
      userId: sessionUser.id,
      title
    }

    if (!errors.length) {
      let theNewAlbum = await dispatch(addAnAlbum(newAlb));

      if (theNewAlbum) {
        history.push(`/albums`)
      }
    }
    
  }

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='pageName titles'>Add Album</h2>
        <ul>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          className='albumEditInput'
          required
          />
        <button type='submit' className=' image-btn submitEditBtn'>Submit</button>
      </form>
    </div>
  )
}

export default AddAlbum;