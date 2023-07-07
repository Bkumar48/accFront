import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const [cart, setCart] = useState([])
    const [updateQty, setUpdateQty] = useState(0)
    const [loading, setLoading] = useState(false)


    // Get cart items from database---------------------------------------------
    const fetchCart = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                setLoading(true);
                const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/getCart/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setLoading(false);
                setCart(data.data.items);
            } catch (error) {
                setLoading(false);
                console.error(error);
                setCart([]);
            }
        }
    }

    // remove cart items from database---------------------------------------------
    const removeCart = async (product) => {
        const token = sessionStorage.getItem('token');
        const id = product.productId._id;
        if (token) {
            try {
                // Show the loading animation
                toast.loading('Removing from cart...', {
                    duration: 1200,
                });
                const { data } = await axios.delete(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/cart/remProductCart`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: {
                            productId: id,
                        },
                    }
                );

                // Hide the loading animation after a delay to simulate response time
                toast.success('Removed from cart!', {
                    duration: 1000,
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
                const newCart = cart.filter((item) => item.productId._id !== product.productId._id);
                setCart(newCart);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        sessionStorage.getItem('token') ? fetchCart() : setCart(sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : []);
    }, [])


    // Session storage cart Section---------------------------------------------
    const totalPrice = () => {
        let total = 0;
        cart.forEach((product) => {
            // total += product.price * product.min_qty;
            sessionStorage.getItem('token') ? total += product.price * product.quantity : total += product.price * product.min_qty;
        })
        return total;
    }

    const removeFromCart = (product) => {
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        const newCart = cart.filter((item) => item.Id !== product.Id);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    const updateCart = (product) => {
        const productId = product.Id;
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        const existingProduct = cart.find((item) => item.Id === productId);
        if (existingProduct) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].Id === productId) {
                    cart[i].min_qty = document.getElementsByClassName('qty-input')[i].value;
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    setCart(cart);
                }
            }
        }
    }
    // update cart items in database---------------------------------------------
    const updatedCart = async (product) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const { data } = await axios.put(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/cart/updateQty/`,
                    {
                        cartproductId: product.Id,
                        qty: updateQty
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setCart(data.data.items);
                fetchCart();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <section id="page-header" className='blog-header'>
                <h2>#cart</h2>
                <p>Read all case studies about our products</p>
            </section>

            {
                sessionStorage.getItem('token') ? (
                    loading ? (
                        <section id='cart' className='section-p1'>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_y0fuakfz.json" background="transparent" speed="1" style={{
                                    width: '300px',
                                    height: '300px',
                                }} loop autoplay></lottie-player>
                                <span>is there anything in your cart?</span>
                            </div>

                        </section>
                    ) : (
                        cart.length > 0 ? (
                            <section id='cart' className='section-p1'>
                                <table width={"100%"}>
                                    <thead>
                                        <tr>
                                            <td>Remove</td>
                                            <td>Image</td>
                                            <td>Product</td>
                                            <td>Price</td>
                                            <td>Quantity</td>
                                            <td>Total</td>
                                            <td>Update</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((product) => (
                                                <tr key={product.Id}>
                                                    <td><i className="fa fa-times" onClick={() => {
                                                        sessionStorage.getItem('token') ? removeCart(product) : removeFromCart(product);
                                                    }} style={{
                                                        cursor: 'pointer',
                                                        color: '#088178'
                                                    }}></i></td>
                                                    <td><img src={
                                                        sessionStorage.getItem('token') ? product.productId.productImage : product.productImage
                                                    } alt="" /></td>
                                                    <td>{
                                                        sessionStorage.getItem('token') ? product.productTile : product.banner_title
                                                    }</td>
                                                    <td>$ {product.price}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            defaultValue={
                                                                sessionStorage.getItem('token') ? product.quantity : product.min_qty
                                                            }
                                                            className="qty-input"
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                setUpdateQty(newValue !== product.quantity ? newValue : product.quantity);
                                                            }}
                                                        />
                                                    </td>
                                                    <td>$ {
                                                        sessionStorage.getItem('token') ? (product.price * product.quantity).toFixed(2) : (product.price * product.min_qty).toFixed(2)
                                                    }</td>
                                                    <td><i className="fa fa-check update-btn" onClick={() => {
                                                        sessionStorage.getItem('token') ? updatedCart(product) : updateCart(product);
                                                    }} style={{
                                                        cursor: 'pointer'
                                                    }}></i></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                        )
                            : (
                                <section id='cart' className='section-p1'>
                                    <h2 style={{
                                        textAlign: 'center',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',

                                        color: '#088178',
                                        marginTop: '5rem',
                                        marginBottom: '2rem'
                                    }}>Cart is empty</h2>
                                </section>
                            )
                    )

                ) : (
                    cart.length > 0 ? (
                        <section id='cart' className='section-p1'>
                            <table width={"100%"}>
                                <thead>
                                    <tr>
                                        <td>Remove</td>
                                        <td>Image</td>
                                        <td>Product</td>
                                        <td>Price</td>
                                        <td>Quantity</td>
                                        <td>Total</td>
                                        <td>Update</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((product) => (
                                            <tr key={product.Id}>
                                                <td><i className="fa fa-times" onClick={() => {
                                                    sessionStorage.getItem('token') ? removeCart(product) : removeFromCart(product);
                                                }} style={{
                                                    cursor: 'pointer',
                                                    color: '#088178'
                                                }}></i></td>
                                                <td><img src={
                                                    sessionStorage.getItem('token') ? product.productId.productImage : product.productImage
                                                } alt="" /></td>
                                                <td>{
                                                    sessionStorage.getItem('token') ? product.productTile : product.banner_title
                                                }</td>
                                                <td>$ {product.price}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        defaultValue={
                                                            sessionStorage.getItem('token') ? product.quantity : product.min_qty
                                                        }
                                                        className="qty-input"
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            setUpdateQty(newValue !== product.quantity ? newValue : product.quantity);
                                                        }}
                                                    />
                                                </td>
                                                <td>$ {
                                                    sessionStorage.getItem('token') ? (product.price * product.quantity).toFixed(2) : (product.price * product.min_qty).toFixed(2)
                                                }</td>
                                                <td><i className="fa fa-check update-btn" onClick={() => {
                                                    sessionStorage.getItem('token') ? updatedCart(product) : updateCart(product);
                                                }} style={{
                                                    cursor: 'pointer'
                                                }}></i></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                    ) : (
                        <section id='cart' className='section-p1'>
                            <h2 style={{
                                textAlign: 'center',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: '#088178',
                                marginTop: '5rem',
                                marginBottom: '2rem'
                            }}>Cart is empty</h2>
                        </section>
                    )
                )
            }


            <section id='cart-add' className='section-p1'>
                <div id='coupon'>
                    <h3>Apply Coupon</h3>
                    <div>
                        <input type="text" placeholder='Enter Coupon Code' />
                        <button className='normal'>Apply</button>
                    </div>
                </div>
                <div id='subtotal'>
                    <h3> Cart Subtotal</h3>
                    <table>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$ {totalPrice()}</td>
                        </tr>
                        <tr>
                            <td>Coupon {"(to be edited..)"}</td>
                            <td>$ {"(to be calculated..)"}</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>$ {totalPrice()}</strong></td>
                        </tr>
                    </table>
                    <button className='normal'>Proceed to Checkout</button>
                </div>
            </section>
        </>
    )
}

export default Cart
