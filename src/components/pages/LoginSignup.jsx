import React, { useState, useEffect } from 'react';
import logo from '../assest/header/logo.png';
import image1 from '../assest/LoginRegister/image1.png';
import image2 from '../assest/LoginRegister/image2.png';
import image3 from '../assest/LoginRegister/image3.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const handleToggle = () => {
        setIsSignUpMode(!isSignUpMode);
    };

    // signin states=====================>
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // signup states=====================>
    const [name, setName] = useState('');
    const [email1, setEmail1] = useState('');
    const [password1, setPassword1] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [mobile, setMobile] = useState('');

    // common states=====================>
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Add products from session storage to cart=====================>
    const addCart = async () => {
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        const token = sessionStorage.getItem('token');
        if (token) {
            const items = [];
            cart.forEach((item) => {
                items.push({
                    productId: item.Id,
                    qty: item.min_qty,
                });
            });
            try {
                for (const item of items) {
                    const { data } = await axios.post(
                        `${process.env.REACT_APP_BASE_URL}/api/v1/cart/addCart`,
                        {
                            productId: item.productId,
                            qty: item.qty,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }
                sessionStorage.removeItem('cart');
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Signup=====================>
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    const signupHandler = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            };
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/register`, {
                first_name: firstName,
                last_name: lastName,
                email: email1,
                contact: mobile,
                password: password1,
                cpassword: confirmpass,
            },
                config);
            setLoading(false);
            setSuccess(data.message);
            console.log(data)
            setName('');
            setEmail1('');
            setPassword1('');
            setConfirmpass('');
            setMobile('');
            toast.success("Registered Successfully, Login to continue", {
                position: "top-center",
            });
            navigate('/login');
            setIsSignUpMode(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
            console.log(error.response.data.massage)
        }
    }

    // Signin=====================>
    const signinHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/login`, {
                email: email,
                password: password,
            });
            setSuccess(data.massage);
            const token = data.token;
            sessionStorage.setItem('token', token);
            setEmail('');
            setPassword('');
            toast.success("Login Successfully", {
                position: "top-center",
            });
            navigate('/');
            addCart();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.massage);
        }
    }

    useEffect(() => {
        const inputs = document.querySelectorAll(".input-field");
        const bullets = document.querySelectorAll('.bullets span');
        const images = document.querySelectorAll('.image');
        const textSlider = document.querySelector('.text-group');
        const handleFocus = (event) => {
            event.target.classList.add("active");
        };

        const handleBlur = (event) => {
            if (event.target.value === "") {
                event.target.classList.remove("active");
            }
        };

        inputs.forEach((input) => {
            input.addEventListener("focus", handleFocus);
            input.addEventListener("blur", handleBlur);

            return () => {
                input.removeEventListener("focus", handleFocus);
                input.removeEventListener("blur", handleBlur);
            };
        });

        let currentImage = document.querySelector(`.img-1`);
        currentImage.classList.add("show");

        const moveSlider = (index) => {

            const actualIndex = index + 1;

            bullets.forEach(bullet => {
                bullet.classList.remove('active');
            });


            images.forEach(image => {
                image.classList.remove('show');
            });


            textSlider.style.transform = `translateY(${-(actualIndex - 1) * 2.2}rem)`;

            bullets[index].classList.add('active');
            images[index].classList.add('show');
        }

        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                moveSlider(index);
            });
        });

    }, []);

    // Slider=====================

    // useEffect(() => {
    //     const bullets = document.querySelectorAll('.bullets span');
    //     const images = document.querySelectorAll('.image');

    //     let index = 1;

    //     const slider = () => {
    //         bullets.forEach(bullet => bullet.classList.remove('active'));
    //         images.forEach(image => image.classList.remove('show'));

    //         bullets[index].classList.add('active');
    //         images[index].classList.add('show');

    //         index++;

    //         if (index > 2) {
    //             index = 0;
    //         }
    //     }

    //     let timer = setInterval(slider, 2000);

    //     bullets.forEach(bullet => {
    //         bullet.addEventListener('click', (e) => {
    //             bullets.forEach(bullet => bullet.classList.remove('active'));
    //             images.forEach(image => image.classList.remove('show'));

    //             e.target.classList.add('active');
    //             images[e.target.dataset.value].classList.add('show');
    //         })
    //     }
    //     )

    //     return () => {
    //         clearInterval(timer);
    //     }

    // }, []);

    // ===========================
    return (<>

        {
            loading && <div className="loader-container">
                <h1 className="loader">Loading...</h1>
            </div>
        }
        <section id='login' className={`${isSignUpMode ? 'sign-up-mode' : ''}${loading ? 'blur' : ''}`}>
            <div className="box">
                <div className="inner-box">
                    <div className="forms-wrap">
                        <form action="" className="sign-in-form" autoComplete='off' onSubmit={signinHandler}>
                            <div className="logo">
                                <img src={logo} alt="" className='logo-img' />
                            </div>
                            <div className="heading">
                                <h2>Welcome Back</h2>
                                <h6>Not registered yet?</h6>
                                <Link to='#' className='toggle' onClick={() => {
                                    handleToggle();
                                }}> Sign Up</Link>
                            </div>
                            <div className='actual-form'>
                                <div className="input-wrap">
                                    <input type="email" minLength={4} value={email} className='input-field' autoComplete='off' required onChange={(e) => setEmail(e.target.value)} />
                                    <label>Email</label>
                                </div>

                                <div className="input-wrap">
                                    <input type="password" minLength={4} value={password} className='input-field' autoComplete='off' required onChange={(e) => setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>

                                <input type="submit" value="Sign In" className='sign-btn' />
                                <p className='text'>Forgotten yoir password or your login details?
                                    <Link to='/reset' className='toggle'>Get help</Link> signing in</p>
                            </div>
                        </form>

                        {/* Signup Form */}

                        <form action="" className="sign-up-form" autoComplete='off'>
                            <div className="logo">
                                <img src={logo} alt="" className='logo-img' />
                            </div>
                            <div className="heading">
                                <h2>Get Started</h2>
                                <h6>Already have an accont?</h6>
                                <Link to='#' className='toggle' onClick={() => {
                                    handleToggle()
                                }}> Sign In</Link>
                            </div>
                            <div className='actual-form'>
                                <div className="input-wrap">
                                    <input type="text" minLength={4} className='input-field' autoComplete='off' required value={name} onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                    <label>Name</label>
                                </div>

                                <div className="input-wrap">
                                    <input type="email" className='input-field' autoComplete='off' required value={email1} onChange={(e) => {
                                        setEmail1(e.target.value);
                                    }} />
                                    <label>Email</label>
                                </div>
                                <div className="input-wrap">
                                    <input type="text" className='input-field' autoComplete='off' required value={mobile} onChange={(e) => {
                                        setMobile(e.target.value);
                                    }} />
                                    <label >Mobile</label>
                                </div>

                                <div className="input-wrap">
                                    <input type="password" minLength={4} className='input-field' autoComplete='off' required value={password1} onChange={(e) => {
                                        setPassword1(e.target.value);
                                    }} />
                                    <label>Password</label>
                                </div>
                                <div className="input-wrap">
                                    <input type="password" minLength={4} className='input-field' autoComplete='off' required value={confirmpass} onChange={(e) => {
                                        setConfirmpass(e.target.value);
                                    }} />
                                    <label>Confirm Password</label>
                                </div>

                                <input type="submit" value="Sign Up" className='sign-btn' onClick={signupHandler} />
                                <p className='text'>By signing up, I agree to the <Link to="#">Terms of Services</Link> and <Link to="#">Privacy Policy</Link></p>
                            </div>
                        </form>
                    </div>
                    <div className="carousel">
                        <div className='images-wrapper'>
                            <img src={image1} alt="" className='image img-1' />
                            <img src={image2} alt="" className='image img-2' />
                            <img src={image3} alt="" className='image img-3' />
                        </div>

                        <div className='text-slider'>
                            <div className="text-wrap">
                                <div className="text-group">
                                    <h2>Grow your business with Us</h2>
                                    <h2>Get accounts of your choice</h2>
                                    <h2>Enter the world of social media</h2>
                                </div>
                            </div>

                            <div className="bullets">
                                <span className='active' data-value="1"></span>
                                <span data-value="2"></span>
                                <span data-value="3"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default LoginSignup
