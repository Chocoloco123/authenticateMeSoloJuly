// 6) Define action type as constants
const LOAD_IMAGES = 'images/LOAD_IMAGES'
// 5) Define action creators
const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images,
});

// 4) Define thunk creator 
export const getImages = () => async(dispatch) => {
  const res = await fetch('/api/images');
  const images = await res.json(); // images is an array from the sequelize findAll query
  dispatch(loadImages(images));
}

// 2) Define an initial state
const initialState = {};
// 1). Define a reducer
const imagesReducer = (state = initialState, action) => {
  switch(action.type) {
  // 6a) add the action type as a case
    case LOAD_IMAGES:
      const newState = { ...state };
      // action.images is an array of image objects
      action.images.forEach((image) => {
        newState[image.id] = image;
      });
      return newState;
    // setup default case, otherwise the reducer won't be happy
    default:
      return state;
  }
}

// 3) Export the reducer
export default imagesReducer;