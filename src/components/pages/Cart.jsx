import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Cart = () => {
    const [cart, setCart] = useState([])
    const [updateQty, setUpdateQty] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const token = Cookies.get('token');

    // Get cart items from database---------------------------------------------
    const fetchCart = async () => {
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
                console.log(data.data.items)
            } catch (error) {
                setLoading(false);
                // console.error(error.response.data.msg);
                setCart([]);
            }
        }
    }

    // remove cart items from database---------------------------------------------
    const removeCart = async (product) => {
        const id = product.productId._id;
        if (token) {
            try {
                toast.loading('Removing from cart...', {
                    autClose: false,
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
                toast.dismiss();
                toast.success('Removed from cart');
                const newCart = cart.filter((item) => item.productId._id !== product.productId._id);
                setCart(newCart);
            } catch (error) {
                console.log(error);
            }
        }
    };

    // update cart items in database---------------------------------------------
    const updatedCart = async (product) => {
        if (token) {
            try {
                const { data } = await axios.put(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/cart/updateQty/`,
                    {
                        cartproductId: product._id,
                        qty: updateQty
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log(data.data.items);
                setCart(data.data.items);
                // fetchCart();
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Get cart items from database---------------------------------------------
    useEffect(() => {
        console.log('Fetching cart data...');
        if (token) {
            fetchCart();
        } else {
            const cartFromSessionStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
            setCart(cartFromSessionStorage);
        }
    }, [token]);


    // Session storage cart Section---------------------------------------------
    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            Cookies.get('token') ? total += cart[i].price * cart[i].quantity : total += cart[i].price * cart[i].min_qty;
        }
        return total;
    }

    // Remove from cart session storage
    const removeFromCart = (product) => {
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        const newCart = cart.filter((item) => item.Id !== product.Id);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    // Update cart session storage
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

    // delete cart from database------------------------------------------------
    const deleteCart = async () => {
        if (token) {
            try {
                const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/emptyCart/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setCart([]);
            } catch (error) {
                console.log(error);
            }
        }
    }


    // Discount Calculation
    const discount = () => {
        let discount = 0;
        for (let i = 0; i < cart.length; i++) {
            Cookies.get('token') ? discount += cart[i].discountPrice * cart[i].quantity : discount += cart[i].price * cart[i].min_qty;
        }
        return discount;
    }

    // create order in database---------------------------------------------
    const createOrder = async () => {
        if (token) {
            if (paymentMethod !== null) {
                try {
                    setLoading2(true);
                    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/order/createOrder`, {
                        pay_method: paymentMethod,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    deleteCart();
                    setLoading2(false);
                    setSuccess(true);
                    setError(false);
                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error('Please select a payment method');
            }
        }
    }

    const handleCreateOrder = () => {
        toast.promise(createOrder(), {
            loading: 'Creating order...',
            success: 'Order created successfully',
            error: 'Failed to create order',
        });
    };


    const handleInputChange = (e, product) => {
        const newValue = parseInt(e.target.value);
        const minValue = Cookies.get('token') ? product.quantity : product.min_qty;

        // Check if the key being pressed is "ArrowDown"
        if (e.key === "ArrowDown" && newValue === minValue) {
            e.preventDefault(); // Prevent the default behavior
        } else if (newValue < minValue) {
            // If the typed value is less than the default value, reset the value to the default value
            setUpdateQty(minValue);
        } else {
            setUpdateQty(newValue); // Update the updateQty state if the value is valid
        }
    };


    return (
        <>
            <section id="page-header" className='blog-header'>
                <h2>#cart</h2>
                <p>Manage your products</p>
            </section>

            {
                Cookies.get('token') ? (
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
                                                <tr key={product._id}>
                                                    <td><i className="fa fa-times" onClick={() => {
                                                        Cookies.get('token') ? removeCart(product) : removeFromCart(product);
                                                    }} style={{
                                                        cursor: 'pointer',
                                                        color: '#088178'
                                                    }}></i></td>
                                                    <td><img src={"https://demo.adaired.com/demoadaired/upload/product/" + product.productId.image

                                                    } alt="" /></td>
                                                    <td>{
                                                        Cookies.get('token') ? product.productTile : product.banner_title
                                                    }</td>
                                                    <td>$ {product.price}</td>
                                                    {/* <td>
                                                        <input
                                                            type="number"
                                                            defaultValue={
                                                                Cookies.get('token') ? product.quantity : product.min_qty
                                                            }
                                                            className="qty-input"
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                setUpdateQty(newValue !== product.quantity ? newValue : product.quantity);
                                                            }}
                                                        />
                                                    </td> */}

                                                    <td>
                                                        <input
                                                            type="number"
                                                            defaultValue={Cookies.get('token') ? product.quantity : product.min_qty}
                                                            className="qty-input"
                                                            min={Cookies.get('token') ? product.quantity : product.min_qty}
                                                            onKeyDown={(e) => handleInputChange(e, product)}
                                                            onChange={(e) => {
                                                                // Allow onChange event to update the updateQty state
                                                                // You may remove this if you don't need it
                                                                setUpdateQty(e.target.value);
                                                            }}
                                                        />
                                                    </td>
                                                    <td>$ {
                                                        Cookies.get('token') ? (product.price * product.quantity).toFixed(2) : (product.price * product.min_qty).toFixed(2)
                                                    }</td>
                                                    <td><i className="fa fa-check update-btn" onClick={() => {
                                                        Cookies.get('token') ? updatedCart(product) : updateCart(product);
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
                                            <tr key={product._id}>
                                                <td><i className="fa fa-times" onClick={() => {
                                                    Cookies.get('token') ? removeCart(product) : removeFromCart(product);
                                                }} style={{
                                                    cursor: 'pointer',
                                                    color: '#088178'
                                                }}></i></td>
                                                <td><img src={"https://demo.adaired.com/demoadaired/upload/product/" + product.image
                                                } alt="" /></td>
                                                <td>{
                                                    Cookies.get('token') ? product.productTile : product.banner_title
                                                }</td>
                                                <td>$ {product.price}</td>
                                                {/* <td>
                                                    <input
                                                        type="number"
                                                        defaultValue={Cookies.get('token') ? product.quantity : product.min_qty}
                                                        className="qty-input"
                                                        min={Cookies.get('token') ? product.quantity : product.min_qty}
                                                        onChange={(e) => {
                                                            const newValue = parseInt(e.target.value);
                                                            const minValue = Cookies.get('token') ? product.quantity : product.min_qty;
                                                            const updatedValue = newValue >= minValue ? newValue : toast.error('Minimum quantity is ' + minValue);
                                                            setUpdateQty(updatedValue);
                                                        }}
                                                    />
                                                </td> */}
                                                <td>
                                                    <input
                                                        type="number"
                                                        defaultValue={Cookies.get('token') ? product.quantity : product.min_qty}
                                                        className="qty-input"
                                                        min={Cookies.get('token') ? product.quantity : product.min_qty}
                                                        onKeyDown={(e) => handleInputChange(e, product)}
                                                        onChange={(e) => {
                                                            // Allow onChange event to update the updateQty state
                                                            // You may remove this if you don't need it
                                                            setUpdateQty(e.target.value);
                                                        }}
                                                    />
                                                </td>
                                                <td>$ {
                                                    Cookies.get('token') ? (product.price * product.quantity).toFixed(2) : (product.price * product.min_qty).toFixed(2)
                                                }</td>
                                                <td><i className="fa fa-check update-btn" onClick={() => {
                                                    Cookies.get('token') ? updatedCart(product) : updateCart(product);

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
                        <tbody>
                            <tr>
                                <td>Cart Subtotal</td>
                                <td>$ {totalPrice()}</td>
                            </tr>
                            <tr>
                                <td>Discount</td>
                                <td>$ {discount()}</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>$ {totalPrice()}</strong></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="payment-methods">
                        <h3>Payment Method</h3>
                        <div className='radiodiv'>
                            <label htmlFor="razorpay" className="paymentMethodBox ">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="razorpay"
                                    value={2}
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value);
                                    }
                                    }
                                />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" />
                            </label>

                            <label htmlFor="bitcoin" className="paymentMethodBox ">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="bitcoin"
                                    value={1}
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value);
                                    }
                                    }
                                />
                                <img src="https://getreviews.buzz/grb/storage/app/blog/CJqkDvSzXLnb6Fa0P43BjNh269G5aOeoNknBz2di.png" alt="Bitcoin" />
                            </label>
                        </div>

                    </div>


                    <button className='normal' onClick={() => {
                        if (token) {
                            if (cart.length > 0) {
                                if (paymentMethod !== null) {
                                    handleCreateOrder();
                                } else {
                                    toast.error('Please select a payment method');
                                }
                            } else {
                                toast.error('Cart is empty');
                            }
                        } else {
                            toast.error('Please login to continue');
                            setTimeout(() => {
                                window.location.href = '/demofront/login';
                            }
                                , 1000);
                        }
                    }}>Proceed to Checkout</button>
                </div>
            </section>
        </>
    )
}

export default Cart
