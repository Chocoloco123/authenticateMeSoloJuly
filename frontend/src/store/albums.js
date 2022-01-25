import { csrfFetch } from './csrf';

const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';

const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums
});

export const getAlbums = () => async(dispatch) => {
  const res = await fetch('/api/albums');
  const albums = await res.json();
  dispatch(loadAlbums(albums));
  return albums;
}

const initialState = {}

const albumsReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case LOAD_ALBUMS:
      newState = { ...state };
      action.albums.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;
    
    default: 
      return state;
    
  }
}

export default albumsReducer