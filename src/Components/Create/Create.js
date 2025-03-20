import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
const Navigate = useNavigate();

  const handleSubmit = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`); 
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('File available at:', url);
            const db = getFirestore();
            const productsRef = collection(db, 'products'); 
            addDoc(productsRef, {
              name,
              category,
              price,
              url,
              userId: user.uid, 
              createdAt: date.toDateString(),
            })
            Navigate('/')
          });
        })
        
    } else {
      console.log('No image selected');
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            id="fname"
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          />
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
