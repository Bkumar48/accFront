import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/common/Header';
import HomeLayout from './components/homepage/HomeLayout';
import Shop from './components/pages/Shop';
import Footer from './components/common/Footer';
import NewsLetter from './components/common/NewsLetter';
import Sproduct from './components/pages/Sproduct';
import Blog from './components/pages/Blog';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import LoginSignup from './components/pages/LoginSignup';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const shouldShowHeaderFooter = location.pathname !== '/login';

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<HomeLayout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Sproduct />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {shouldShowHeaderFooter && <NewsLetter />}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default App;