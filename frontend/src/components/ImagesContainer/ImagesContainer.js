// // Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
// import { useEffect } from 'react';
// // Import hooks from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'


// // Import the thunk creator
// import { getImages } from '../../store/images';
// import styles from './ImagesContainer.module.css';
// // get images... not sure about this route
// // import { images } from '../../../../backend/db/models/'


// const ImagesContainer = () => {
//   // Declare variable from hooks
//   const dispatch = useDispatch();
//   // get images from our store
//   const imagesObj = useSelector((state) => state.images);
//   const images = Object.values(imagesObj);

//   // Use a 'react' hook and cause a side effect
//   useEffect(() => {
//     // dispatches our thunk after the return part has been rendered for the first time
//     dispatch(getImages()); 
//   }, [dispatch]);

//   return (
//     <div>
//       <ul>
//         {images.map((image) => <li key={image.imageUrl} image={image.imageUrl}></li>)}
//       </ul>
//     </div>
//   );
// };

// export default ImagesContainer;