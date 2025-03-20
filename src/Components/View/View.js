import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { query, where, getDocs, collection } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    if (!db) {
      console.error("Firestore instance (db) is not initialized.");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        const q = query(collection(db, 'users'), where('id', '==', userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (postDetails) {
      fetchUserDetails();
    }
  }, [postDetails, db]);

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="Product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>Two Wheeler</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
