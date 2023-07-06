import React, { useState, useEffect } from 'react';
import logo from '../assest/header/logo.png';
import image1 from '../assest/LoginRegister/image1.png';
import image2 from '../assest/LoginRegister/image2.png';
import image3 from '../assest/LoginRegister/image3.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Add products from session storage to cart=====================>
    const addCart = async () => {
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        const token = sessionStorage.getItem('token');
        if (token) {
            // cart.forEach(async (item) => {
            //     try {
            //         const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/addCart`, {
            //             productId: item.Id,
            //             qty: item.min_qty,
            //         }, {
            //             headers: {
            //                 Authorization: `Bearer ${token}`,
            //             },
            //         });
            //         console.log(data);
            //     } catch (error) {
            //         console.log(error);
            //     }

            //     console.log(item)
            // });


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
                    console.log(data);
                }
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
                email: email,
                password: password,
                contact: mobile,
                cpassword: confirmpass,
            },
                config);
            setLoading(false);
            setSuccess(data.message);
            console.log(data)
            setName('');
            setEmail('');
            setPassword('');
            setConfirmpass('');
            setMobile('');
            toast.success("Registered Successfully", {
                position: "top-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#333',
                },
            });
            navigate('/login');
            toast.success("Login to continue", {
                position: "top-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#333',
                },
            });
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
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
            setLoading(false);
            setSuccess(data.massage);
            const token = data.token;
            sessionStorage.setItem('token', token);
            setEmail('');
            setPassword('');
            toast.success("Login Successfully", {
                position: "top-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#333',
                },
            });
            navigate('/');
            addCart();
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
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

        const moveSlider = (index) => {
            bullets.forEach(bullet => {
                bullet.classList.remove('active');
            });

            images.forEach(image => {
                image.classList.remove('show');
            });

            textSlider.style.transform = `translateY(${-(index + 1 - 1) * 2.2}rem)`;

            bullets[index].classList.add('active');
            images[index].classList.add('show');
        }

        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                moveSlider(index);
            });
        });

    }, []);

    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const handleToggle = () => {
        setIsSignUpMode(!isSignUpMode);
    };

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
        <section id='login' className={isSignUpMode ? 'sign-up-mode' : ''}>
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

                        <form action="" className="sign-up-form" autoComplete='off' onSubmit={signupHandler}>
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
                                    <input type="email" className='input-field' autoComplete='off' required value={email} onChange={(e) => {
                                        setEmail(e.target.value);
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
                                    <input type="password" minLength={4} className='input-field' autoComplete='off' required value={password} onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                                    <label>Password</label>
                                </div>
                                <div className="input-wrap">
                                    <input type="password" minLength={4} className='input-field' autoComplete='off' required value={confirmpass} onChange={(e) => {
                                        setConfirmpass(e.target.value);
                                    }} />
                                    <label>Confirm Password</label>
                                </div>

                                <input type="submit" value="Sign Up" className='sign-btn' />
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
