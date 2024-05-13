import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Hero from "./components/Hero"; // Import Hero component
import {  Routes, Route } from 'react-router-dom';
import Page404 from "./components/Page404";
import ProductSection from "./components/products/ProductSection";
import ProductDetails from "./components/products/productId/ProductDetails";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import CartList from './components/CartList';
import CheckOut from './components/CheckOut';
import Footer from './components/Footer';


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<div> <Header /> <Hero /> <ProductSection /> <Footer /> </div>} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/cartlist" element={<CartList />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
