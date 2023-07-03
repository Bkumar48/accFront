import React from 'react'
import facebook from "../assest/feature/facebook.png"
import gmail from "../assest/feature/gmail.png"
import youtube from "../assest/feature/youtube.png"
import instagram from "../assest/feature/instagram.png"
import f1 from "../assest/feature/f1.png"
import f2 from "../assest/feature/f2.png"
import f3 from "../assest/feature/f3.png"
import f4 from "../assest/feature/f4.png"
import f5 from "../assest/feature/f5.png"
import f6 from "../assest/feature/f6.png"
const FeatureAccounts = () => {
    return (
        <section id='feature' className='section-p1'>
            <div className='fe-box'>
                <img src={f1} alt="feature" />
                <h6>Facebook Accounts</h6>
            </div>
            <div className='fe-box'>
                <img src={f2} alt="feature" />
                <h6>Gmail Accounts</h6>
            </div>
            <div className='fe-box'>
                <img src={f3} alt="feature" />
                <h6>Cost Effective</h6>
            </div>
            <div className='fe-box'>
                <img src={f4} alt="feature" />
                <h6>Cost Effective</h6>
            </div>
            <div className='fe-box'>
                <img src={f5} alt="feature" />
                <h6>Happy sell</h6>
            </div>
            <div className='fe-box'>
                <img src={f6} alt="feature" />
                <h6>24/7 Support</h6>
            </div>
        </section>
    )
}

export default FeatureAccounts
