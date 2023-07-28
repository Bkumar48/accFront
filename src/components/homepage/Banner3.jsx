import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const Banner3 = () => {
    // fetch testimonials
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const fetchTestimonials = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/vi/admin/testimonial/getAll?limit&skip&search=`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
            })
            setTestimonials(res.data.data)
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])


    return (
        <section id='banner3'>
            <div className='banner-box'>
                <h2>Testimonials</h2>
            </div>
            <div className='banner-box'>
                <h2>Testimonials</h2>
            </div>
            <div className='banner-box'>
                <h2>Testimonials</h2>
            </div>
        </section>
    )
}

export default Banner3


