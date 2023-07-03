import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Sproduct = () => {
    // Featured Products
    const [products, setProducts] = useState([])
    const [success, setSuccess] = useState(false)
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/allProduct?categoryId=&productId=&maincateId=&search=gmail&limit=4&skip`)
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

    // Single Product
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/allProduct?categoryId=&productId=${id}&maincateId=&search=gmail&limit&skip`)
                setProduct(data.proData[0])
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        getProduct()
    }, [id])
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }
    const { banner_title, price, description, image, type, min_qty } = product
    return (
        <>
            <setion id="prodetails" className="section-p1">
                <div className='single-pro-image'>
                    <img src={product.image} alt={product.title} width={"100%"} id="MainImg" />
                </div>
                <div className='single-pro-details'>
                    <h6>Home/Single product</h6>
                    <h4>{product.banner_title}</h4>
                    <h2>${product.price}<small> /unit</small></h2>
                    {/* <select>
                    <option value="0">Select Size</option>
                    <option value="1">S</option>
                    <option value="2">M</option>
                    <option value="3">L</option>
                    <option value="4">XL</option>
                </select> */}
                    <input type="number" min={product.min_qty} defaultValue={product.min_qty} />
                    <button className="normal" >Add to cart</button>
                    <h4>Product Details</h4>
                    <span dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
            </setion>
            <section id="product1" className='section-p1'>
            <h2>Featured Products</h2>
            <p>Most selling Accounts</p>
            <div className='pro-container'>
                {
                    products.map((product) => (
                        <div className='pro' key={product.Id}>
                            <img src={product.image} alt="product" />
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
                            <Link to='/product' className='btn'><i class="fa-solid fa-cart-shopping cart"></i></Link>
                        </div>
                    ))
                }

            </div>
        </section>
        </>
    )
}

export default Sproduct
