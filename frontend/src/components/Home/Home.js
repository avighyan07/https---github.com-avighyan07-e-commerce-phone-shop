// import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/cg";
 import "./Home.css";
// import ProductCard from "./Product";
// import { getProduct } from "../../actions/Productactions";
// import{useSelector,useDispatch} from "react-redux"


// const Home = () => {
//   // const alert = useAlert();
//   const dispatch = useDispatch();
//    const { loading, error, products } = useSelector((state) => state.products);

//   useEffect(() => {
//     // if (error) {
//     //   alert.error(error);
//     //   dispatch(clearErrors());
//     // }
//   //  dispatch(getProduct());
//   }, [dispatch]);
// //console.log(products)
//   return (
//     // <Fragment>
//     //   {loading ? (
//     //     <Loader />
//     //   ) : (
//         <Fragment>
//           {/* <MetaData title="ECOMMERCE" /> */}
//            <h1 id="z">ECOMMERCE</h1>
//           <div className="banner">
//             <h2>Welcome to Ecommerce</h2>
//             <h1>FIND AMAZING PRODUCTS BELOW</h1>

//             <a href="#container">
//               <button>
//                 Scroll <CgMouse />
//               </button>
//             </a>
//           </div>
//           <h2 className="homeHeading">Featured Products</h2>
//           <div id="container" className="container">
//             {/* <ProductCard product={product1}/>
//             <ProductCard product={product2}/>
//             <ProductCard product={product3}/> */}

//             {products && products.map((product)=><ProductCard product={product}/>)}
//           </div>
//     </Fragment>
// )}
// export default Home;

import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import axios from "axios";
import ProductCard from "./Product";
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4005/api/v1/homeproducts");
        console.log("API Response:", response.data); // Log the API response
        setProducts(response.data.pds); // Access the 'pds' array
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
  
    fetchProducts();
  }, []);
  
  return (
    <Fragment>
      
      <div className="banner">
        <h2>Welcome to Ecommerce</h2>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div id="container" className="container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default Home;