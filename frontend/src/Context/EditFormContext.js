// import { createContext, useState, useContext } from 'react';
// import { useHistory, useParams } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux'

// export const EditFormContext = createContext();
// // if you invoke the createContext method with an argument, the argument will be the context's default value.

// // editForm wrapper component
// export function EditFormProvider(props) {
//   const params = useParams();
//   const { imageId } = params;
//   // declare variable from hooks
//   const dispatch = useDispatch();
//   // get image from our store
//   const imagesObj = useSelector((state) => state.images); 
//   // console.log(imagesObj);
//   const images = Object.values(imagesObj);
  
//   const img = images.find((image) => +imageId === image.id);
//   console.log('img: ', img);

//   const [imageTitle, setImageTitle] = useState(img?.imageTitle);
//   const [content, setContent] = useState(img?.content);

//   return (
//     <EditFormContext.Provider value={{ imageTitle, setImageTitle, content, setContent }}>
//       {props.children}
//     </EditFormContext.Provider>
//   )
// }