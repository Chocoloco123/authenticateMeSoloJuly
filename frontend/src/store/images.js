import { csrfFetch } from './csrf';

// 6) Define action type as constants
const LOAD_IMAGES = 'images/LOAD_IMAGES'
const ADD_IMAGE = 'images/ADD_IMAGE'
const EDIT_IMAGE = 'images/EDIT_IMAGE'

// 5) Define action creators
const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images,
});

const addOneImage = (image) => ({
  type: ADD_IMAGE,
  image,
})

const editOneImage = (image) => ({
  type: EDIT_IMAGE,
  image
})

// 4) Define thunk creator 
export const getImages = () => async(dispatch) => {
  const res = await fetch('/api/images');
  const images = await res.json(); // images is an array from the sequelize findAll query
  dispatch(loadImages(images));
  return images;
}

export const addImages = (image) => async(dispatch) => {
  const res = await csrfFetch('/api/images/newImage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });
  // const data = await res.json()
  // console.log('------> ',data); // this works
  if (res.ok) {
    const imgData = await res.json();
    console.log('=======> ', imgData.newImage);
    // dispatch(addOneImage(imgData.image));
    dispatch(addOneImage(imgData.newImage));
    console.log(imgData)
  }
}

export const editImage = (imageId, imgData) => async(dispatch) => {
  const { imageTitle, content } = imgData;
  // res is response from the backend
  const res = await csrfFetch(`/api/images/${imageId}/edit`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({imageTitle, content}),
  });
  
  if (res.ok) {
    const imgData = await res.json();
    // check backend route for naming!
    dispatch(editOneImage(imgData.updatedImg));
  }
}

// 2) Define an initial state
const initialState = {};
// 1). Define a reducer

const imagesReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
  // 6a) add the action type as a case
    case LOAD_IMAGES:
      newState = { ...state };
      // action.images is an array of image objects
      // normalize state of action.images array
      action.images.forEach((image) => {
        newState[image.id] = image;
      });
      return newState;
    case ADD_IMAGE:
      console.log('action before: ', action.image);
      // ! after this action before it doesn't work
      console.log('action.newImage: ', action.image);
      // newState = { ...state, [action.image.id]: action.image };
      newState = { ...state, [action.image.id]: action.image };
      console.log('action after: ', action.newImage);
      return newState;
    case EDIT_IMAGE:
      // origin image id key = updated image data 
      state[action.image.id] = action.image;
      newState = { ...state };
      return newState;
    // setup default case, otherwise the reducer won't be happy
    default:
      return state;
  }
}

// 3) Export the reducer
export default imagesReducer;