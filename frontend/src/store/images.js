import { csrfFetch } from './csrf';

// 6) Define action type as constants
const LOAD_IMAGES = 'images/LOAD_IMAGES'
const ADD_IMAGE = 'images/ADD_IMAGE'
// 5) Define action creators
const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images,
});

const addOneImage = (image) => ({
  type: ADD_IMAGE,
  image
})

// 4) Define thunk creator 
export const getImages = () => async(dispatch) => {
  const res = await fetch('/api/images');
  const images = await res.json(); // images is an array from the sequelize findAll query
  dispatch(loadImages(images));
  return images;
}

export const addImages = (image) => async (dispatch) => {
  const res = await csrfFetch('/api/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if (res.ok) {
    const imgData = await res.json();
    dispatch(addOneImage(imgData.image));
    console.log(imgData)
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
      newState = { ...state, [action.image.id]: action.imag };
      return newState;
    // setup default case, otherwise the reducer won't be happy
    default:
      return state;
  }
}

// 3) Export the reducer
export default imagesReducer;