import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomeLayout/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/product/:id' element={<Sproduct/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
        <NewsLetter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;

