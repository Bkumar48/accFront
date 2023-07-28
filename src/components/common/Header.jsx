import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assest/header/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

// Get cart count from database---------------------------------------------
export const fetchCart = async () => {
  if (Cookies.get('token')) {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/getCart/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(data.data.items.length)
      return data.data.items.length;
    } catch (error) {
      // console.log(error);
      return 0;
    }
  }
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavActive, setIsNavActive] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const token = Cookies.get('token');

  if (token) {
    fetchCart().then((res) => {
      setCartCount(res);
    })
  }

  // Get cart count from session storage---------------------------------------
  const productCount = () => {
    const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    if (Cookies.get('token')) {
      setIsLoggedin(true);
    }
  }, [Cookies.get('token')]);

  // useEffect for cart array changes
  useEffect(() => {
    if (!token) {
      productCount();
    }
  }, [sessionStorage.getItem('cart')]);

  // Scroll to the top of the page when the route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <section id="header">
      <a href="/demofront/">
        <img src={logo} alt="logo" className="logo" />
      </a>
      <div>
        <ul id="navbar" className={isNavActive ? 'active' : ''}>
          <li>
            <Link to="/demofront/" className={location.pathname === '/demofront/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/demofront/shop" className={location.pathname === '/demofront/shop' ? 'active' : ''}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/demofront/blog" className={location.pathname === '/demofront/blog' ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/demofront/about" className={location.pathname === '/demofront/about' ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/demofront/contact" className={location.pathname === '/demofront/contact' ? 'active' : ''}>
              Contact
            </Link>
          </li>
          {
            isLoggedin ? (
              <li>
                <Link to="/userpanel/"
                >
                  Dashboard
                </Link>
              </li>)
              : null
          }
          {Cookies.get('token') ? (
            <li
              className="login logout"
              onClick={() => {
                toast((t) => {
                  return (
                    <div>
                      <span>Are you sure?
                        <button style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '5px',
                          marginLeft: '10px'
                        }}
                          onClick={() => toast.dismiss(t.id)}
                        >No</button>
                        <button onClick={() => {
                          Cookies.remove('token');
                          setIsLoggedin(false);
                          navigate('/demofront/');
                          toast.dismiss(t.id)
                        }} style={{
                          backgroundColor: 'green',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '5px',
                          marginLeft: '10px'
                        }}>Yes</button></span>
                    </div>
                  )
                }, {
                  position: 'top-right',
                })
              }}
            >
              Logout
            </li>
          ) : (
            <li
              className="login"
              onClick={() => {
                navigate('/demofront/login');
              }}
            >
              Login
            </li>
          )}
          <li id="lg-bag">
            <Link to="/demofront/cart" className={location.pathname === '/demofront/cart' ? 'active' : ''}>
              <i className="fa-solid fa-bag-shopping">
                <span className="big-count count">{cartCount}</span>
              </i>
            </Link>
          </li>
          <Link
            to="#"
            id="close"
            onClick={() => {
              setIsNavActive(!isNavActive);
            }}
          >
            <i className="fa-solid fa-times"></i>
          </Link>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/demofront/cart">
          <i className="fa-solid fa-bag-shopping">
            <span className="tab-count count">{cartCount}</span>
          </i>
        </Link>
        <i
          id="bar"
          className="fa-solid fa-bars"
          onClick={() => {
            setIsNavActive(!isNavActive);
          }}
        ></i>
      </div>
    </section>
  );
};

export default Header;
