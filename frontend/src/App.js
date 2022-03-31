import './App.css';
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';

function App() {
    
  React.useEffect(() => {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>  
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
