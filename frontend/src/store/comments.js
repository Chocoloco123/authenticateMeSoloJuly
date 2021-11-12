import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
})

export const getPageComments = () => async(dispatch) => {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  console.log('storeComments: ', comments);
  dispatch(loadComments(comments));
  return comments;
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case LOAD_COMMENTS:
      console.log('commentsAction Before: ', action);
      newState = { ...state };
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      })
      console.log('commentsAction after: ', action);
      return newState;
    default: 
      return state;
  }

}

export default commentsReducer;