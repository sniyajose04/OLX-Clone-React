import React, { useContext, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const Navigate = useNavigate()
  useEffect(() => {
    const db = getFirestore();
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id, 
          };
        });
        setProducts(allPost);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []); 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card"
            onClick={()=>{
              setPostDetails(product)
              Navigate('/view')
            }}
             key={product.uid}> 
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        {/* <div className="heading">
          <span>Fresh recommendations</span>
        </div> */}
        {/* <div className="cards">
          {products.map((product) => (
            <div className="card"
            onClick={()=>{
              setPostDetails(product)
              Navigate('/view')
            }}
             key={product.uid}> 
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </div>
  );
}

export default Posts;
