import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
});

const addOneComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const removeOneComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment,
})

export const getPageComments = () => async(dispatch) => {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  // console.log('storeComments: ', comments);
  dispatch(loadComments(comments));
  return comments;
}

export const addAComment = (imageId, comment) => 
async(dispatch) => {
  const res = await csrfFetch(`/api/comments/${imageId}/newComment`, {
    method: 'POST',
    headers: { 'Content-Type': 
    'application/json' }, // had a period betw application and json, no no!
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const commentData = await res.json();
    
    dispatch(addOneComment(commentData.newComment));
    return res;
  }
};

export const deleteComment = (commentId) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}/delete`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeOneComment(commentId));
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
    case REMOVE_COMMENT:
      newState = { ...state };
      // console.log('action: ', action, 'action.comment: ', action.comment)
      delete newState[action.comment];
      return newState;
    default: 
      return state;
  }

}

export default commentsReducer;