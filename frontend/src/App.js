import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ImagesContainer from "./components/ImagesContainer/";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SingleImgCont from "./components/ImagePage";
import AddImage from "./components/AddImageContainer";
import EditImage from "./components/EditImagePage";
import AddNewComment from './components/AddCommentPage';
import LandingContainer from "./components/LandingPage";
import SearchedImagePage from "./components/search/SearchPage";
import AlbumsPage from "./components/AlbumsPage";
import AlbumImagesPage from "./components/AlbumImagesPage";
import AddAlbum from "./components/NewAlbum";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingContainer />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/images/addImage'>
            <AddImage />
          </Route>
          <Route exact path='/home'>
            <ImagesContainer />
          </Route>
          <Route exact path='/images/:imageId'>
            <SingleImgCont />
          </Route>
          <Route exact path='/images/:imageId/edit'>
            <EditImage />
          </Route>
          <Route exact path='/images/:imageId/comments/newComment'>
            <AddNewComment />
          </Route>
          <Route exact path="/search/:searched">
            <SearchedImagePage />
          </Route>
          <Route exact path="/albums">
            <AlbumsPage />
          </Route>
          <Route exact path='/albums/newAlbum'>
            <AddAlbum />
          </Route>
          <Route exact path="/albums/:albumName">
            <AlbumImagesPage />
          </Route>
        </Switch>
      )}
    </>
  );

}

export default App;