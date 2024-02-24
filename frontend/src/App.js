import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import CatProducts from './components/Product/Catproducts';
import Search from './components/Product/search';

import Signup from './components/Product/Signup';
import Login from './components/Product/Login';
const alertOptions = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products/:keyword" element={<CatProducts  />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
             {/* <Route path="/login" element={<AuthForm type="login" />}/> */}
          </Routes>
          <Footer />
        </Router>
      </div>
    </AlertProvider>
  );
}

export default App;



// // import './App.css';
// // import './components/layout/Header/Header'
// // import WebFont from 'webfontloader'
// // import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
// // import Header from './components/layout/Header/Header';
// // import { useEffect } from 'react';
// // import Footer from './components/layout/Footer/Footer';
// // import Home from'./components/Home/Home.js';
// // function App() {
// //   useEffect(() => {
// //     WebFont.load({
// //       google: {
// //         families: ["Roboto", "Droid Sans", "Chilanka"],
// //       },
// //     });
// //   },[]);
// //   return (
// //     <div className="App">
// //       <Router>
// //         <Routes>
// //       {/* <h1>hello avi</h1> */}
// //       <Header/>
// //       <Route exact path="/" component={Home}/>
// //       <Footer/>
// //       </Routes>
// //       </Router>
// //     </div>
// //   );
// // }

// // export default App;

// import './App.css';
// import WebFont from 'webfontloader';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/layout/Header/Header';
// import { useEffect } from 'react';
// import Footer from './components/layout/Footer/Footer';
// import Home from './components/Home/Home';
// import ProductDetails from './components/Product/ProductDetails';
// import Search from './components/Product/search';
// import { useNavigate } from "react-router-dom";
// function App() {
//   const history = useNavigate();

//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: ["Roboto", "Droid Sans", "Chilanka"],
//       },
//     });
//   }, []);

//   return (
//     <div className="App">
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" exact element={<Home />} />
//           <Route path="/product/:id" element={<ProductDetails />} exact />
//           <Route path="/search" element={<Search history={history} />} exact />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect } from 'react';
// import WebFont from 'webfontloader';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/layout/Header/Header';
// import Footer from './components/layout/Footer/Footer';
// import Home from './components/Home/Home';
// import ProductDetails from './components/Product/ProductDetails';
// import Catproducts from './components/Product/Catproducts';
// import Search from './components/Product/search';

// function App() {
//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: ["Roboto", "Droid Sans", "Chilanka"],
//       },
//     });
//   }, []);

//   return (
//     <div className="App">
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product/:id" element={<ProductDetails />} />

//           <Route path="/products/:keyword" element={<Catproducts />} />
//           <Route path="/search" element={<Search />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;