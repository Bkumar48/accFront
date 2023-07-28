import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const NewArrival = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // Add to cart if Logged in
    const addCart = async (product) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                setLoading(true);
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
                setLoading(false);
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
        }
        else {
            cart.push(product);
            toast.success("Product added to cart",{
                duration:800,
            });
            sessionStorage.setItem('cart', JSON.stringify(cart));

        }
    }
    return (
        <section id="product1" className='section-p1'>
            <h2>New Arrivals</h2>
            <p>Most selling Accounts</p>
            <div className='pro-container'>
                {
                    products.map((product) => (
                        <div className='pro' key={product.Id}>
                            <img src={`https://demo.adaired.com/demoadaired/upload/product/${product.image}`} alt="product" />
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

export default NewArrival
