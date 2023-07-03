import React from 'react'
import logo from "../assest/header/logo.png"
import apple from "../assest/app_icons/apple.jpg"
import google from "../assest/app_icons/play.jpg"
import pay from "../assest/app_icons/pay.png"
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <section>
            <footer className="section-p1">
                <div className="col">
                    <img src={logo} alt='logo' className='logo' />
                    <h4>Contact</h4>
                    <p><strong>Address:</strong> 123 Street Name, City, England</p>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Fri</p>
                    <div className="follow">
                        <h4>Follow Us:</h4>
                        <div className="icon">
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-linkedin-in"></i>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <h4>About</h4>
                    <Link to='/about'>About Us</Link>
                    <Link to='/contact'>Delivery Options</Link>
                    <Link to='/contact'>Privacy Policy</Link>
                    <Link to='/contact'>Terms & Conditions</Link>
                    <Link to='/contact'>Contact Us</Link>
                </div>

                <div className="col">
                    <h4>My Account</h4>
                    <Link to='/about'>Sign In</Link>
                    <Link to='/contact'>View Cart</Link>
                    <Link to='/contact'>My WishList</Link>
                    <Link to='/contact'>My Orders</Link>
                    <Link to='/contact'>Help</Link>
                </div>

                <div className="col install">
                    <h4>Install App</h4>
                    <p>From App Store or Google Play</p>
                    <div className="row">
                        <img src={apple} alt="appstore" />
                        <img src={google} alt="googleplay" />
                    </div>
                    <p>Secured Payment Gateways</p>
                    <img src={pay} alt="payment" />
                </div>
                <div className="copyright">
                    <p>© 2023 Ecommerce. All Rights Reserved | Designed by <span onClick={() => {
                        window.open('https://www.linkedin.com/in/bittu-kumar48')
                    }}><strong>Bittu Kumar</strong></span></p>
                </div>
            </footer>
        </section>
    )
}

export default Footer
