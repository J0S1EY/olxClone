import React, { useContext, useEffect, useState } from 'react';
import { FireBaseContext } from '../../contexts/Context';
import { collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import View from '../View/View';
import { useHistory } from 'react-router-dom';
import { postContext } from '../../contexts/PostsContext';


function Posts() {
  const { fireBase } = useContext(FireBaseContext)
  const [products, setProducts] = useState([])
  const history = useHistory()
  const { setPostData } = useContext(postContext)
  useEffect(() => {
    // Fetch the documents from Firestore using .then() instead of async/await
    getDocs(collection(fireBase, 'items'))
      .then((querySnapshot) => {
        const allItems = querySnapshot.docs.map((product) => {
          return {
            ...product.data(),  // Spread the product data
            id: product.id      // Include the document ID
          };
        });
        setProducts(allItems);  // Set the fetched products into state
      })
      .catch((error) => {
        console.log('Error fetching documents:', error);
      });
  }, [fireBase]);  // Dependency array ensures this runs when fireBase changes


  console.log(products)

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map((item) => {
              return <div className="card" onClick={()=>{
                setPostData(item)
                history.push('/viewproduct')
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={item.imgUrl} alt="" />
                </div>
                <div className="content">
                  <span className="kilometer"> {item.productName}</span>
                  <p className="rate">&#x20B9; {item.price}</p>
                  <p className="name"> {item.brand}</p>
                </div>
                <div className="date">
                  <span>{item.createdAt}</span>
                </div>
              </div>
            })
          }

        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
