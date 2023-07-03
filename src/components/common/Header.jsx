import React, { useState, useEffect } from 'react'
import logo from "../assest/header/logo.png"
import { Link } from 'react-router-dom'

export const productCount = () => {
  const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
  return cart.length;
};

const Header = () => {

  const [isNavActive, setIsNavActive] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(productCount())
  }, [])

  return (
    <section id='header'>
      <a href='/'>
        <img src={logo} alt='logo' className='logo' />
      </a>
      <div>
        <ul id='navbar' className={isNavActive ? 'active' : ''}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop"  >Shop</Link></li>
          <li><Link to="/blog" >Blog</Link></li>
          <li><Link to="/about" >About</Link></li>
          <li><Link to="/contact" className='active' >Contact</Link></li>
          <li id='lg-bag'><Link to="/cart" ><i class="fa-solid fa-bag-shopping"><span className='big-count'>{cartCount}</span></i></Link></li>
          <Link to="#" id="close" onClick={() => {
            setIsNavActive(!isNavActive)
          }
          }><i class="fa-solid fa-times"></i></Link>
        </ul>

      </div>
      <div id='mobile'>
        <Link to="/cart" ><i class="fa-solid fa-bag-shopping "><span className='tab-count'>{cartCount}</span></i></Link>
        <i id="bar" class="fa-solid fa-bars" onClick={() => {
          setIsNavActive(!isNavActive)
        }}></i>
      </div>
    </section>
  )
}
export default Header