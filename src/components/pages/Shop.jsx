import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
const Shop = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const token = Cookies.get('token');

    // fetch all products
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/allProduct?categoryId=&productId=&maincateId=&search=gmail&limit&skip`)
            setProducts(res.data.proData)
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
            console.log(error)
        }
    }

    // fetch products on page load
    useEffect(() => {
        fetchProducts()
    }, [])

    // get cart from database if the user is logged in
    const fetchCart = async () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                setLoading(true);
                const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/getCart/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setCartItems(data.data.items);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error.response.data.msg !== 'Cart not Found') {
                    console.log(error.response.data.msg);
                }
                setCartItems([]);
            }
        }
    }

    // fetch cart on page load
    useEffect(() => {
        fetchCart();
    }, [token]);

    // Add to cart if not logged in
    const addToCart = (product) => {
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        const existingProduct = cart.find((item) => item.Id === product.Id);
        const Quantity = product.min_qty;
        if (existingProduct) {
            alert('Product already in cart');
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].Id === product.Id) {
                    const oldQty = cart[i].min_qty;
                    cart[i].min_qty = Quantity + oldQty;
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                }
            }
        }
        else {
            cart.push(product);
            toast.success("Product added to cart");
            sessionStorage.setItem('cart', JSON.stringify(cart));

        }
    }

    // Add to cart if Logged in
    const addCart = async (product) => {
        if (token) {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/cart/addCart`,
                    {
                        productId: product.Id,
                        qty: product.min_qty
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setCartItems(data.data.items);
                console.log(data.data.items)
            } catch (error) {
                console.log(error);
            }
        }
    };

    const addCartPromise = (product) => {
        toast.promise(addCart(product), {
            loading: 'Adding to cart...',
            success: 'Added to cart',
            error: 'Could not add to cart',
        });
    }


    return (
        <>
            <section id="page-header">
                <h2>#stayhome</h2>
                <p>Save more with coupons & up to 30% off! </p>
            </section>
            {
                loading ? (
                    <section id="product1" className='section-p1'>

                        <div id='loader'>
                            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_rlbhauvj.json" background="transparent" speed="2.5" style={{
                                width: '500px',
                                height: '500px',
                            }} loop autoplay></lottie-player>
                        </div>
                    </section>
                ) : (
                    <section id="product1" className='section-p1'>
                        <div className='pro-container'>
                            {
                                products.map((product) => (
                                    <div className='pro' key={product.Id} >
                                        <img src={"https://demo.adaired.com/demoadaired/upload/product/" + product.image} alt="product" onClick={() => {
                                            navigate(`/product/${product.Id}`)
                                        }} />
                                        <div className='des'>
                                            <span>{product.type}</span>
                                            <h4>{product.banner_title}</h4>
                                            <div className='star'>
                                                <i className='fa fa-star'></i>
                                                <i className='fa fa-star'></i>
                                                <i className='fa fa-star'></i>
                                                <i className='fa fa-star'></i>
                                                <i className='fa fa-star'></i>
                                                {/* <i className='fa fa-star-half-o'></i> */}
                                            </div>
                                            <h4><span>Price:</span> $ {product.price}</h4>
                                        </div>
                                        <Link to='#' className='btn'><i class="fa-solid fa-cart-shopping cart" onClick={() => {
                                            Cookies.get('token') ? addCartPromise(product) : addToCart(product)
                                        }}></i></Link>
                                    </div>
                                ))
                            }

                        </div>
                    </section>
                )
            }
            <section id="pagination" className="section-p1">
                <Link to="#" className="btn">1</Link>
                <Link to="#" className="btn">2</Link>
                <Link to="#" className="btn"><i class="fa fa-long-arrow-alt-right"></i></Link>
            </section>
        </>
    )
}

export default Shop
