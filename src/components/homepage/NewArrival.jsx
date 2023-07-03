import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const NewArrival = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/allProduct?categoryId=&productId=&maincateId=&search=gmail&limit&skip`)
            setProducts(res.data.proData)
            console.log(res.data.proData)
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
        cart.push(product);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }


    return (
        <section id="product1" className='section-p1'>
            <h2>New Arrivals</h2>
            <p>Newly added or coming soon accounts</p>
            <div className='pro-container'>
                {
                    products.map((product) => (
                        <div className='pro' key={product.Id}>
                            <img src={product.image} alt="product" />
                            <div className='des'>
                                <span>{product.type}</span>
                                <h4>{product.banner_title}</h4>
                                {/* <div className='star'> */}
                                    {/* <i className='fa fa-star'></i> */}
                                    {/* <i className='fa fa-star'></i> */}
                                    {/* <i className='fa fa-star'></i> */}
                                    {/* <i className='fa fa-star'></i> */}
                                    {/* <i className='fa fa-star'></i> */}
                                    {/* <i className='fa fa-star-half-o'></i> */}
                                {/* </div> */}
                                <h4><span>Price:</span> $ {product.price}</h4>
                            </div>
                            <Link to='#' className='btn'><i class="fa-solid fa-cart-shopping cart" onClick={()=>{
                                addToCart(product)
                            }}></i></Link>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}

export default NewArrival
