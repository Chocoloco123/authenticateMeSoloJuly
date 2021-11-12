import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';

const loadComments = (comments) => ({
  type: LOAD_COMMENTS.replace,
  comments,
})

export const getComments = () => async(dispatch) => {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  dispatch(loadComments(comments));
  return comments;
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
      case LOAD_COMMENTS:
        newState = { ...state };
        action.comments.forEach((comment) => {
          newState[comment.id] = comment;
        })
        return newState;
      default: 
        return state;
  }

}

export default commentsReducer;