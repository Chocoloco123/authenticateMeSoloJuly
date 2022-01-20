import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, Redirect } from 'react-router-dom';
import * as commentActions from '../../store/comments';

const AddNewComment = () => {
  const sessionUser = useSelector(state => state.session.user);
  const params = useParams();
  const { imageId } = params;
  // const [userId, setUserId] = useState('');
  // const [userId, setUserId] = useState(sessionUser.id);
  // const [theImageId, setTheImageId] = useState('');
  // const [theImageId, setTheImageId] = useState(imageId);
  // const [imageId, setImageId] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  // console.log('sessionUser: ', sessionUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { 
      userId: sessionUser.id, 
      theImageId: imageId,
      comment,
    };
    
    dispatch(commentActions.addAComment(imageId, newComment))
    .then((res) => {
        // console.log('this is res: ', res);
        if (res.ok) {
          setErrors([]);
          history.push(`/images/${imageId}`);
        }
      })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
    
  };

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className='addCommentCont'>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/images/${imageId}`} 
        className='backBtnPhoto' >Back</NavLink>
      </div>
      <form onSubmit={handleSubmit} className='add-image editImgFormContainer'>
      <h2 >Add A Comment</h2>
        <ul className='loginErrorsList'>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <label htmlFor='commentLabel' className='editImgLabel commentLabel'>Comment</label>
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder='Write a comment...'
        />
        <div className='imageBtnsBox commentBtnsBox'>
          <button type='submit' className=' image-btn comments-btn submitEditBtn'>Submit</button>
        </div>
      </form>
    </div>

  )
}

export default AddNewComment;