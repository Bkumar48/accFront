import React from 'react'
import { Link } from 'react-router-dom'

const HeroBanner = () => {
    return (
        <section id="hero">
            <h2>12+ years of </h2>
            <h1>Exceptional service </h1>
            <p>Quick And Secure Marketplace To Buy Email And Social Media Accounts</p>
            <Link to="/demofront/shop/"><button>Shop Now</button></Link>
        </section>
    )
}

export default HeroBanner
