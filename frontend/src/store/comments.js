import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';

const ADD_COMMENT = 'comments/ADD_COMMENT';

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
});

const addOneComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
})

export const getPageComments = () => async(dispatch) => {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  console.log('storeComments: ', comments);
  dispatch(loadComments(comments));
  return comments;
}

export const addAComment = (comment) => 
async(dispatch) => {
  const res = await csrfFetch('/api/comments/:imageId(\\d+)/newComment', {
    method: 'POST',
    headers: { 'Content-Type': 
    'application.json' },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const commentData = await res.json();
    dispatch(addOneComment(commentData));
  }
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case LOAD_COMMENTS:
      // console.log('commentsAction Before: ', action);
      newState = { ...state };
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      })
      // console.log('commentsAction after: ', action);
      return newState;
    case ADD_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    default: 
      return state;
  }

}

export default commentsReducer;