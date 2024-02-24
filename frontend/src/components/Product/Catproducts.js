import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../Home/Product";
import "./Catproducts.css";

const categories = [
  "5G",
  "4G",
  "3G"
];

const CatProducts = () => {
  const alert = useAlert();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(null);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/products`, {
          params: {
            keyword: keyword,
            page: currentPage,
            "price[gte]": price,
            "price[lte]": 25000,
            category: category,
            "ratings[gte]": ratings,
          },
        });

        const totalPages = Math.ceil(response.data.prcn / count);
        setProducts(response.data.pds);
        setCount(response.data.resultPerPage);

        setTotalPages(totalPages);
      } catch (error) {
        alert.error("An error occurred");
      }
    };

    fetchData();
  }, [alert, keyword, currentPage, price, category, ratings]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const priceHandler = (event) => {
    setPrice(parseInt(event.target.value, 10));
  };

  return (
    <Fragment>
      <h2 className="productsHeading">Products</h2>

      <div className="products">
        {products && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Previous
        </button>
        {Array.from({ length: Math.ceil(count / 2) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <div className="filterBox">
          <label htmlFor="price">Price</label>
          <input
            type="range"
            id="price"
            value={price}
            onChange={priceHandler}
            min={0}
            max={25000}
          />
          <span>{price}</span>
        </div>

        <div className="categoriesBox">
          <p>Categories</p>
          <ul className="categoryBox">
            {categories.map((categoryItem) => (
              <li
                className={`category-link ${category === categoryItem ? 'active' : ''}`}
                key={categoryItem}
                onClick={() => setCategory(categoryItem)}
              >
                {categoryItem}
              </li>
            ))}
          </ul>
        </div>

        <div className="ratingsBox">
          <p>Ratings Above</p>
          <input
            type="range"
            value={ratings}
            onChange={(e) => setRatings(parseInt(e.target.value, 10))}
            min={0}
            max={5}
          />
          <span>{ratings}</span>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
};

export default CatProducts;


// import React, { Fragment, useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import ProductCard from "../Home/Product";
// import "./Catproducts.css";

// const CatProducts = () => {
//   const alert = useAlert();
//   const [products, setProducts] = useState([]);
//   const [count, setCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const { keyword } = useParams();
//   const [price, setPrice] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/products`, {
//           params: {
//             keyword: keyword,
//             page: currentPage,
//             "price[gte]": price,
//             "price[lte]": 25000 
//           },
//         });

//         const totalPages = Math.ceil(response.data.prcn / count);
//         setProducts(response.data.pds);
//         setCount(response.data.resultPerPage);
   
//         setTotalPages(totalPages);
//       } catch (error) {
//         alert.error("An error occurred");
//       }
//     };

//     fetchData();
//   }, [alert, keyword, currentPage,price]);

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const priceHandler = (event) => {
//     setPrice(parseInt(event.target.value, 10));
//   };

//   return (
//     <Fragment>
//       <h2 className="productsHeading">Products</h2>

//       <div className="products">
//         {products && products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>

//       <div className="pagination">
//         <button disabled={currentPage === 1} onClick={handlePrevPage}>
//           Previous
//         </button>
//         {Array.from({ length: Math.ceil(count / 2) }).map((_, index)  => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             disabled={currentPage === index + 1}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <div className="filterBox">
//           <label htmlFor="price">Price</label>
//           <input
//             type="range"
//             id="price"
//             value={price}
//             onChange={priceHandler}
//             min={0}
//             max={25000}
//           />
//           <span>{price}</span>
//         </div>
        
//         <button
//           disabled={currentPage === totalPages}
//           onClick={handleNextPage}
//         >
//           Next
//         </button>
//       </div>
//     </Fragment>
//   );
// };

// export default CatProducts;


// import React, { Fragment, useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import ProductCard from "../Home/Product";
// import "./Catproducts.css";
// import Slider from "@material-ui/core/Slider";


// const CatProducts = () => {
//   const alert = useAlert();
//   const [products, setProducts] = useState([]);
//   const [count, setCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const { keyword } = useParams();
//   const [x, setx] = useState(0);
//   const [price, setPrice] = useState([0, 25000]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/products`, {
//           params: {
//             keyword: keyword,
//             page: currentPage,
//           },
//         });

//         const totalPages = Math.ceil(response.data.prcn / count);
//         setProducts(response.data.pds);
//         setCount(response.data.resultPerPage);
   
//         setx(response.data.prcn);
//         setTotalPages(totalPages);
//       } catch (error) {
//         alert.error("An error occurred");
//       }
//     };

//     fetchData();
//   }, [alert, keyword, currentPage]);

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };
//   return (
//     <Fragment>
//       <h2 className="productsHeading">Products</h2>

//       <div className="products">
//         {products && products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>

//       <div className="pagination">
//         <button disabled={currentPage === 1} onClick={handlePrevPage}>
//           Previous
//         </button>
//         {Array.from({ length: Math.ceil(count / 2) }).map((_, index)  => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             disabled={currentPage === index + 1}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <div className="filterBox">
//             <Typography>Price</Typography>
//             <Slider
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={0}
//               max={25000}
//             /></div>
        
//         <button
//           disabled={currentPage === totalPages}
//           onClick={handleNextPage}
//         >
//           Next
//         </button>
//       </div>
//     </Fragment>
//   );
// };

// export default CatProducts;







// import React, { Fragment, useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import axios from "axios";
// import { useParams } from "react-router-dom"; 
// import ProductCard from "../Home/Product";
// import "./Catproducts.css";

// const CatProducts = () => {
//   const alert = useAlert();
//   const [products, setProducts] = useState([]);
//   const [count, setCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const { keyword } = useParams();
//   const [x, setx] = useState(0);
//   console.log("next",x)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/products`, {
//           params: {
//             keyword: keyword,
//             page: currentPage,
//             //  paginate: true,
//           },
//         });
//        const y=response.data.resultPerPage
//       //  const x=response.data.prcn
//         setProducts(response.data.pds);
//         setCount(response.data.resultPerPage);
//         setx(response.data.prcn)
//         console.log("c=",count)
//       } catch (error) {
//         alert.error("An error occurred");
//       }
//     };

//     fetchData();
//   }, [alert, keyword, currentPage]);

//   const handleNextPage = () => {
//     console.log('Next page clicked');
//     console.log("cuur",currentPage)
//     setCurrentPage((prevPage) => prevPage + 1);
//   };
  
//   const handlePrevPage = () => {
//     console.log('Previous page clicked');
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handlePageChange = (page) => {
//    console.log(Math.ceil(x/count))
//     setCurrentPage(page);
//   };

//   return (
//     <Fragment>
//       <h2 className="productsHeading">Products</h2>

//       <div className="products">
//         {products && products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>

//       <div className="pagination">
//         <button disabled={currentPage === 1} onClick={handlePrevPage}>
//           Previous
//         </button>
//         {Array.from({ length: Math.ceil(count / 2) }).map((_, index) => (
//           <button
//             key={index + 1}
//              //onClick={() => handlePageChange(index + 1)}
//             //  disabled={currentPage >= Math.ceil(x/count)-1 }
//              onClick={handlePageChange}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           disabled={currentPage > Math.ceil(x/count) }
//           onClick={handleNextPage}
//         >
//           Next
//         </button>
//       </div>
//     </Fragment>
//   );
// };

// export default CatProducts;


// import React, { Fragment, useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import axios from "axios";
// import { useParams } from "react-router-dom"; 
// import ProductCard from "../Home/Product";
// import "./Catproducts.css";

// const CatProducts = ({ match }) => {
//   const alert = useAlert();
//   const [products, setProducts] = useState([]);
//   const [count, setCount] = useState(0);
//   // const keyword = match.params.keyword;
//   const { keyword } = useParams();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/products?keyword=${keyword}`);
//         // const { data } = await axios.get(response);
//         setProducts(response.data.pds);
//         // setCount(response.data.productsCount);
//         // console.log(response.data.productsCount)
//       } catch (error) {
//         alert.error("An error occurred");
//       }
//     };

//     fetchData();
//   }, [alert, keyword]);



//   return (
//     <Fragment>
//       <h2 className="productsHeading">Products</h2>

//       <div className="products">
//         {products && products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </Fragment>
//   );
// };

// export default CatProducts;




// import React, { Fragment, useEffect, useState } from "react";

// import { useAlert } from "react-alert";

// import axios from "axios";
// // import Pagination from "react-js-pagination";
// import ProductCard from "../Home/Product";
// import "./Catproducts.css";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

// const Catproducts = ({ match }) => {
// //   const alert = useAlert();
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [price, setPrice] = useState([0, 25000]);
// //   const [category, setCategory] = useState("");
// //   const [ratings, setRatings] = useState(0);

//   const keyword = match.params.keyword;

//   const [products, setProducts] = useState([]);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const link = `http://localhost:4000/api/v1/products?keyword=${keyword}`;
//         const { data } = await axios.get(link);
//         setProducts(data.products);
//         setCount(data.productsCount);
//       } catch (error) {
//         alert.error(error.response.data.message);
//       }
//     };

//     fetchData();
//   }, []); //currentPage, price, category, ratings, keyword, alert

// //   const priceHandler = (event, newPrice) => {
// //     setPrice(newPrice);
// //   };

// //   const setCurrentPageNo = (e) => {
// //     setCurrentPage(e);
// //   };

//   return (
//     <Fragment>
      
//       <h2 className="productsHeading">Products</h2>

//       <div className="products">
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>

    
//     </Fragment>
//   );
// };

// export default Catproducts;



  {/* <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
      </div>

      {count > 0 && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={4} // Change this value as needed
            totalItemsCount={count}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )} */}

      //&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}