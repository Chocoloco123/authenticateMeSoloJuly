import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';


// Import the thunk creator
import { editImage, getImages } from '../../store/images';

const EditImage = () => {
  const params = useParams();
  const { imageId } = params;
  // declare variable from hooks
  const dispatch = useDispatch();
  // get image from our store
  const imagesObj = useSelector((state) => state.images); 
  // console.log(imagesObj);
  const images = Object.values(imagesObj);
  
  const img = images.find((image) => +imageId === image.id);
  console.log('img: ', img);

  const [imageTitle, setImageTitle] = useState(img?.imageTitle);
  const [content, setContent] = useState(img?.content);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const imgData = {
      imageTitle,
      content
    };
    dispatch(editImage(imageId, imgData));
    // take the user back to home
    history.push(`/images/${imageId}`);
  };

  useEffect(() => {
    dispatch(getImages())
    // ! keep a watch on this one!
    // on page useStates work but on refresh the inputs are not there anymore
  }, [dispatch, images?.length])

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>The Edit Image Page</h1>
      <input onChange={e => setImageTitle(e.target.value)} value={imageTitle}
      placeholder='Title'></input>
      <input onChange={e => setContent(e.target.value)} value={content} placeholder='Description'></input>
      <button type='submit'>Submit</button>
    </form>
  );
};
export default EditImage;