//important
import React, { useState,useEffect } from 'react';
import { Fragment } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom"; // Import the useParams hook
import "./productdetails.css"
import ReviewCard from './ReviewCard';
const ProductDetails = ({
  loading,
 
  submitReviewToggle,
  open,
  setRating,
  rating,
  comment,
  setComment,
  reviewSubmitHandler
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4005/api/v1/find/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Ensure that the necessary properties are defined
  const productName = product.name || "N/A";
  const productId = product._id || "N/A";
  const numOfReviews = product.numOfReviews || 0; // Assuming numOfReviews is a number
  const productPrice = product.price || 0; // Assuming product.price is a number
  const stock = product.Stock ;

  // Define options for Rating component
  const ratingOptions = {
    size: "large",
    value: product.ratings || 0, // Assuming ratings is a number
    readOnly: true,
    precision: 0.5,
  };


  
const increaseQuantity = () => {
  if (product.Stock <= quantity) return;

  const qty = quantity + 1;
  setQuantity(qty);
};

const decreaseQuantity = () => {
  if (1 >= quantity) return;

  const qty = quantity - 1;
  setQuantity(qty);
};
const addToCartHandler = () => {
  // Add your logic for adding to the cart here

  // Display a success message using an alert
  const alertMessage = document.createElement('div');
  alertMessage.className = 'alert-message';
  alertMessage.textContent = `${quantity} items added to cart successfully!`;
  
  document.body.insertBefore(alertMessage, document.body.firstChild);
  setTimeout(() => {
    document.body.removeChild(alertMessage);
  }, 3000);
};
  return (
    <Fragment>
      <div className="ProductDetails">
        {product.images && product.images.length > 0 && (
          <div className="carousel-container">
            {product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
          </div>
        )}
        <div>
          <div className="detailsBlock-1">
            <h2>{productName}</h2>
            <p>Product # {productId}</p>
          </div>
          <div className="detailsBlock-2">
            <span className="detailsBlock-2-span">
              {' '}
              ({numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${productPrice}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity}  />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                // disabled={product.Stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
              {/* {isAddedToCart && <div style={{ color: 'blue' ,border:'bold black 3px'}}>Item added to cart successfully!</div>} */}
            </div>
            <p>
              Status:
              {/* <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
              </b> */}
              {/* {`${stock}`<1?'OutOfStock' : 'InStock'}
              {`${stock}`<1?'redColor' : 'greenColor'} */}
              <b className={stock < 1 ? 'redColor' : 'greenColor'}>
  {stock < 1 ? 'OutOfStock' : 'InStock'}
</b>

            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      {/* Custom Modal */}
      {open && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h2>Submit Review</h2>
            </div>
            <div className="custom-modal-body">
              {/* Rating Component (you can use a custom one) */}
              {/* <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" /> */}

              {/* Textarea for Comment */}
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="custom-modal-footer">
              <button onClick={submitReviewToggle}>Cancel</button>
              <button onClick={reviewSubmitHandler}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {/* Render your reviews here */}

      {/* Show a message if no reviews */}
      {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </Fragment>
  );
};

export default ProductDetails;

// import React, { useState, useEffect } from 'react';
// import { Fragment } from 'react';
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./productdetails.css";
// import ReviewCard from './ReviewCard';

// const ProductDetails = ({
//   loading,
 
 
//   open,
//   setRating,
//   rating,
//   comment,
//   setComment,
  
// }) => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/find/${id}`);
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const productName = product.name || "N/A";
//   const productId = product._id || "N/A";
//   const numOfReviews = product.numOfReviews || 0;
//   const productPrice = product.price || 0;
//   const stock = product.Stock;

//   const ratingOptions = {
//     size: "large",
//     value: product.ratings || 0,
//     readOnly: true,
//     precision: 0.5,
//   };


 
//   const increaseQuantity = () => {
//     if (product.Stock <= quantity) return;

//     const qty = quantity + 1;
//     setQuantity(qty);
//   };

//   const decreaseQuantity = () => {
//     if (1 >= quantity) return;

//     const qty = quantity - 1;
//     setQuantity(qty);
//   };

//   // const addToCartHandler = () => {
//   //   dispatch(addItemsToCart(match.params.id, quantity));
//   //   alert.success("Item Added To Cart");
//   // };

//   // const submitReviewToggle = () => {
//   //   open ? setOpen(false) : setOpen(true);
//   // };

//   // const reviewSubmitHandler = () => {
//   //   const myForm = new FormData();

//   //   myForm.set("rating", rating);
//   //   myForm.set("comment", comment);
//   //   myForm.set("productId", match.params.id);

//   //   dispatch(newReview(myForm));

//   //   setOpen(false);
//   // };

//   // useEffect(() => {
//   //   if (error) {
//   //     alert.error(error);
//   //     dispatch(clearErrors());
//   //   }

//   //   if (reviewError) {
//   //     alert.error(reviewError);
//   //     dispatch(clearErrors());
//   //   }

//   //   if (success) {
//   //     alert.success("Review Submitted Successfully");
//   //     dispatch({ type: NEW_REVIEW_RESET });
//   //   }
//   //   dispatch(getProductDetails(match.params.id));
//   // }, [dispatch, match.params.id, error, alert, reviewError, success]);

//   return (
//     <Fragment>
//       <div className="ProductDetails">
//         {product.images && product.images.length > 0 && (
//           <div className="carousel-container">
//             {product.images.map((item, i) => (
//               <img
//                 className="CarouselImage"
//                 key={i}
//                 src={item.url}
//                 alt={`${i} Slide`}
//               />
//             ))}
//           </div>
//         )}
//         <div>
//           <div className="detailsBlock-1">
//             <h2>{productName}</h2>
//             <p>Product # {productId}</p>
//           </div>
//           <div className="detailsBlock-2">
//             <span className="detailsBlock-2-span">
//               {' '}
//               ({numOfReviews} Reviews)
//             </span>
//           </div>
//           <div className="detailsBlock-3">
//             <h1>{`₹${productPrice}`}</h1>
//             <div className="detailsBlock-3-1">
//               <div className="detailsBlock-3-1-1">
//                 <button onClick={decreaseQuantity}>-</button>
//                 <input readOnly type="number" value={quantity} placeholder={`${stock}`} />
//                 <button onClick={increaseQuantity}>+</button>
//               </div>
//               <button
//                 disabled={product.Stock < 1 ? true : false}
//                 // onClick={addToCartHandler}
//               >
//                 Add to Cart
//               </button>
//             </div>
//             <p>
//               Status:
//               <b className={stock < 1 ? 'redColor' : 'greenColor'}>
//                 {stock < 1 ? 'OutOfStock' : 'InStock'}
//               </b>
//             </p>
//           </div>

//           <div className="detailsBlock-4">
//             Description : <p>{product.description}</p>
//           </div>

//           <button  className="submitReview">
//             {/* onClick={submitReviewToggle} */}
//             Submit Review
//           </button>
//         </div>
//       </div>

//       <h3 className="reviewsHeading">REVIEWS</h3>

//       {open && (
//         <div className="custom-modal">
//           <div className="custom-modal-content">
//             <div className="custom-modal-header">
//               <h2>Submit Review</h2>
//             </div>
//             <div className="custom-modal-body">
//               <textarea
//                 className="submitDialogTextArea"
//                 cols="30"
//                 rows="5"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//             </div>
//             <div className="custom-modal-footer">
//               <button >Cancel</button>
//               {/* onClick={submitReviewToggle} */}
//               <button >Submit</button>
//               {/* onClick={reviewSubmitHandler} */}
//             </div>
//           </div>
//         </div>
//       )}

//       {product.reviews && product.reviews[0] ? (
//         <div className="reviews">
//           {product.reviews &&
//             product.reviews.map((review) => (
//               <ReviewCard key={review._id} review={review} />
//             ))}
//         </div>
//       ) : (
//         <p className="noReviews">No Reviews Yet</p>
//       )}
//     </Fragment>
//   );
// };

// export default ProductDetails;
