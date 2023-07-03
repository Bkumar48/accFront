import React from 'react'
import FeatureAccounts from '../homepage/FeatureAccounts'
import a5 from '../assest/about/a7.jpg'
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <>
            <section id="page-header" className='about-header'>
                <h2>#KnowUs</h2>
                <p>Best digital marketing company ever.</p>
            </section>
            <section id="about-head" className='section-p1'>
                <img src={a5} alt="about" />
                <div>
                    <h2>Who are we?</h2>
                    <p>We are a team of passionate people whose goal is to improve everyone's life through disruptive products. We build great products to solve your business problems.</p>
                    <abbr title=''>Our mission is to make your business profitable.</abbr>
                </div>
            </section>

            {/* <section id='about-app' className='section-p1'>
                <h1>Download Our <Link to="#">App</Link></h1>
                <div className='video'>
                    <video autoplay muted loop src='https://www.youtube.com/watch?v=9No-FiEInLA'></video>
                </div>
            </section> */}
            <FeatureAccounts />
        </>
    )
}

export default About
