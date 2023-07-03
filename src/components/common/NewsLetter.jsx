import React from 'react'

const NewsLetter = () => {
    return (
        <section id='newsletter' className='section-p1 section-m1'>
            <div className='newstext'>
                <h4>Subscribe to our Newsletter</h4>
                <p>Get all the latest information on <span>Events</span>, <span>Sales</span> and <span>Offers</span>. Sign up for newsletter today.</p>
            </div>
            <div className='form'>
                <input type="text" placeholder='Enter your email address' />
                <button className='normal'>Subscribe</button>
            </div>

        </section>
    )
}

export default NewsLetter
