import React, { useState, useEffect } from 'react'

const Cart = () => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
        setCart(cart)
    }, [])

    const totalPrice = () => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.min_qty;
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

    return (
        <>
            <section id="page-header" className='blog-header'>
                <h2>#cart</h2>
                <p>Read all case studies about our products</p>
            </section>
            {
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
                                                removeFromCart(product);
                                            }}></i></td>
                                            <td><img src={product.image} alt="" /></td>
                                            <td>{product.banner_title}</td>
                                            <td>$ {product.price}</td>
                                            <td><input type="number" defaultValue={product.min_qty} className="qty-input" />{ }</td>
                                            <td>$ {(product.price * product.min_qty).toFixed(2)}</td>
                                            <td><i className="fa fa-check update-btn" onClick={() => { updateCart(product) }}></i></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </section>
                ) : (
                    <section id='cart' className='section-p1'>
                        <h2>Cart is empty</h2>
                    </section>
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
