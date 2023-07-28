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
  const shouldShowHeaderFooter = location.pathname !== '/demofront/login';

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/demofront/login" element={<LoginSignup />} />
        <Route path="/demofront/" element={<HomeLayout />} />
        <Route path="/demofront/shop" element={<Shop />} />
        <Route path="/demofront/product/:id" element={<Sproduct />} />
        <Route path="/demofront/blog" element={<Blog />} />
        <Route path="/demofront/about" element={<About />} />
        <Route path="/demofront/contact" element={<Contact />} />
        <Route path="/demofront/cart" element={<Cart />} />
      </Routes>
      {shouldShowHeaderFooter && <NewsLetter />}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default App;