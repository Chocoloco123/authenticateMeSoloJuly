const FIND_IMAGE = '/search/FIND_IMAGE';

const searchedImage = (images) => ({
  type: FIND_IMAGE,
  images
})

export const searchForImage = (searched) => async(dispatch) => {
  const res = await fetch(`/api/images/search/${searched}`)

  if (res.ok) {
    const searchedImg = await res.json();
    dispatch(searchedImage(searchedImg))
    return searchedImg;
  }
}

const searchReducer = (state={}, action) => {
  switch(action.type) {
    case FIND_IMAGE: {
      const newState = action.images
      return newState
    }
    default:
      return state;
  }
}

export default searchReducer;