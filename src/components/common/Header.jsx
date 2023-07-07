// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import logo from "../assest/header/logo.png"
// import { Link, useNavigate, useLocation } from 'react-router-dom'

// export const productCount = () => {
//   const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
//   return cart.length;
// };




// const Header = () => {

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isNavActive, setIsNavActive] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   // Cart count if logged in
//  const cart = async () => {
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/getCart/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setCartCount(data.data.items.length);
//     } catch (error) {
//       // console.log(error);
//       setCartCount(0);
//     }
//   }
// };


//   useEffect(() => {
//  sessionStorage.getItem('token') ? cart() : setCartCount(productCount());
//   }, [])

//   return (
//     <section id='header'>
//       <a href='/'>
//         <img src={logo} alt='logo' className='logo' />
//       </a>
//       <div>
//         <ul id='navbar' className={isNavActive ? 'active' : ''}>
//           <li><Link to="/" className={location.pathname === "/" ? "active" : ""} >Home</Link></li>
//           <li><Link to="/shop" className={location.pathname === "/shop" ? "active" : ""}>Shop</Link></li>
//           <li><Link to="/blog" className={location.pathname === "/blog" ? "active" : ""}>Blog</Link></li>
//           <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""} >About</Link></li>
//           <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
//           {
//             sessionStorage.getItem('token') ?
//               <li className='login logout' onClick={() => {
//                 sessionStorage.removeItem('token');
//                 navigate('/');
//               }}>Logout</li> :
//               <li className='login' onClick={() => {

//                 navigate('/login');
//               }
//               }>Login</li>

//           }
//           <li id='lg-bag'><Link to="/cart" ><i class="fa-solid fa-bag-shopping"><span className='big-count count'>{cartCount}</span></i></Link></li>
//           <Link to="#" id="close" onClick={() => {
//             setIsNavActive(!isNavActive)
//           }
//           }><i class="fa-solid fa-times"></i></Link>
//         </ul>

//       </div>
//       <div id='mobile'>
//         <Link to="/cart" ><i class="fa-solid fa-bag-shopping "><span className='tab-count count'>{cartCount}</span></i></Link>
//         <i id="bar" class="fa-solid fa-bars" onClick={() => {
//           setIsNavActive(!isNavActive)
//         }}></i>
//       </div>
//     </section>
//   )
// }
// export default Header


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assest/header/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const productCount = () => {
  const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
  return cart.length;
};

export const cart = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/getCart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return data.data.items.length;
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else {
    return productCount();
  }
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavActive, setIsNavActive] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = await cart();
      setCartCount(count);
    };
    fetchCartCount();
  }, []);

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
          {sessionStorage.getItem('token') ? (
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
                          sessionStorage.removeItem('token');
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
                },{
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
            <Link to="/cart">
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