
import { csrfFetch } from './csrf';

const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const ADD_ALBUM = 'albums/ADD_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';
const DELETE_ALBUM = 'albums/Delete_ALBUM';

const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums
});

const addAlbum = (album) => ({
  type: ADD_ALBUM,
  album
});

const editAlbum = (album) => ({
  type: EDIT_ALBUM,
  album
});

const deleteAlbum = (album) => ({
  type: DELETE_ALBUM,
  album
});

export const getAlbums = () => async(dispatch) => {
  const res = await fetch('/api/albums');
  const albums = await res.json();
  dispatch(loadAlbums(albums));
  return albums;
}

export const addAnAlbum = (data) => async(dispatch) => {
  const res = await csrfFetch('/api/albums/newAlbum', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newAlbum = await res.json();
    dispatch(addAlbum(newAlbum));
    return newAlbum;
  }
}

export const editAnAlbum = (albumId, albumName, data) => async(dispatch) => {
  const { title } = data;
  const res = await csrfFetch(`/api/albums/${albumId}/${albumName}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title})
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editAlbum(data.updatedAlbum));
    return res;
  }
}

export const deleteAnAlbum = (albumId) => async(dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}/delete`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteAlbum(albumId))
  }
}

const initialState = {}

const albumsReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case LOAD_ALBUMS:
      newState = { ...state };
      action.albums.forEach((album) => {
        newState[album.id] = album;
      })
      return newState;
    case ADD_ALBUM: 
      newState = { ...state, [action.album.id]:action.album }
      return newState;
    case EDIT_ALBUM:
      state[action.album.id] = action.album;
      newState = { ...state };
      return newState;
    case DELETE_ALBUM:
      newState = { ...state };
      // delete newState[action.album]
      delete newState[action.album.id];
      return newState;
    default: 
      return state;
  }
}

export default albumsReducer;