// import React from "react";
// import { Link } from "react-router-dom";
// import ReactStar from "react-rating-stars-component"

// const options={
//     edit:false,
//     color:"rgba(20,20,20,0.1)",
//     activeColor:"tomato",
//     size:window.innerHeight<600?20:25,
//     value:3.5,
//     isHalf:true
// }

// const ProductCard = ({ product }) => {
//     // const options = {
//     //   value: product.ratings,
//     //   readOnly: true,
//     //   precision: 0.5,
//     // };
//     return (
//       <Link className="productCard" to ={product._id}>
//         <img src={product.images[0].url} alt={product.name} />
//         <p>{product.name}</p>
//         <div>
//           <ReactStar {...options} /> <span>256 reviews</span>
//         </div>
//         <span>{product.price}</span>
//       </Link>
//     );
//   };
  
// export default ProductCard

import React, { useState } from "react";
import ReactStar from "react-rating-stars-component";
import { Link } from "react-router-dom";
import ProductDetails from "../Product/ProductDetails";

const ProductCard = ({ product }) => {
  const [options] = useState({
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerHeight < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  });

  return (
    <div className="productCard">
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStar {...options} /> <span>{product.numOfReviews} reviews</span>
      </div>
      <span>{`Rs ${product.price}`}</span>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;