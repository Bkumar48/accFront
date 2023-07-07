import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { cart } from '../common/Header';
import { RotatingLines } from 'react-loader-spinner'

const Shop = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

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

    useEffect(() => {
        fetchProducts()
    }, [])

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
            cart();
        }
        else {
            cart.push(product);
            sessionStorage.setItem('cart', JSON.stringify(cart));

        }
    }

    // Add to cart if Logged in
    const addCart = async (product) => {
        const token = sessionStorage.getItem('token');
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
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    };






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
                                        <img src={product.image} alt="product" onClick={() => {
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
                                            sessionStorage.getItem('token') ? addCart(product) : addToCart(product)
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
