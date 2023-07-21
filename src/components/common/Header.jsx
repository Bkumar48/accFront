import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assest/header/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavActive, setIsNavActive] = useState(false);
  const [cartCount, setCartCount] = useState();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const token = Cookies.get('token');

  const handleclick = () => {
    window.open(`http://localhost:3001`, "_self");
  }

  const productCount = () => {
    const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
    return cart.length;
  };

  const cart = async () => {
    
    if (token) {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/getCart/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCartCount(data.data.items.length);
      } catch (error) {
        if (error.response.data.msg !== 'Cart not Found') {
          console.log(error.response.data.msg);
        }
        setCartCount(0);
      }
    } else {
      setCartCount(productCount());
    }
  };

  useEffect(() => {
    cart();
  }, []);

  useEffect(() => {
    if (Cookies.get('token')) {
      setIsLoggedin(true);
    }
  }, [Cookies.get('token')]);


  return (
    <section id="header">
      <a href="/">
        <img src={logo} alt="logo" className="logo" />
      </a>
      <div>
        <ul id="navbar" className={isNavActive ? 'active' : ''}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
          </li>
          {
            isLoggedin ? (
              <li>
                <Link to="" onClick={() => {
                  handleclick();
                }}  >
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
                          // sessionStorage.removeItem('token');
                          Cookies.remove('token');
                          setIsLoggedin(false);
                          navigate('/');
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
                // navigate('/');
              }}
            >
              Logout
            </li>
          ) : (
            <li
              className="login"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </li>
          )}
          <li id="lg-bag">
            <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
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
        <Link to="/cart">
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
