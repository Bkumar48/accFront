import React from 'react'
import b20 from "../assest/contact/b20.jpg";
import p1 from "../assest/contact/1.png";
import p2 from "../assest/contact/2.png";
import p3 from "../assest/contact/3.png";
const Contact = () => {
    return (
        <>
            <section id="page-header" className='about-header'>
                <h2>#support</h2>
                <p>LEAVE A MESSAGE, We love to hear from you!</p>
            </section>

            <section id="contact-details" className='section-p1'>
                <div className="details">
                    <span>GET IN TOUCH</span>
                    <h2>Visit our agency or contact us today</h2>
                    <h3>Head Office</h3>
                    {/* <p>Our team is ready to answer your queries. Fill out the form below and we’ll be in touch as soon as possible.</p> */}
                    <div>
                        <li>
                            <i class="fa fa-map"></i>
                            <p>123 Street, New York, USA</p>
                        </li>
                        <li>
                            <i class="fa fa-envelope"></i>
                            <p>
                                <a href="mailto:bittu@adaired.com" target="_blank" rel="noreferrer">bittu@adaired.com</a>
                            </p>
                        </li>
                        <li>
                            <i class="fa fa-phone-alt"></i>
                            <p>
                                <a href="tel:+91 1234567890">+91 1234567890</a>
                            </p>
                        </li>
                        <li>
                            <i class="fa fa-clock"></i>
                            <p>
                                Mon - Fri: 9:00 - 19:00
                            </p>
                        </li>
                    </div>
                </div>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13726.077385873228!2d76.72997715262346!3d30.67566064898202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed5cb98c5777%3A0x8a21444801a080f9!2sAdAired%20Digital%20Media!5e0!3m2!1sen!2sin!4v1688045568198!5m2!1sen!2sin" width="600" height="450" style={{
                        border: 0,
                    }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>

            <section id="form-details" className='section-p1'>
                <form action="">
                    <span>LEAVE A MESSAGE</span>
                    <h2>We love to hear from you</h2>
                    <input type="text" placeholder="Your Name" />
                    <input type="text" placeholder="E-mail" />
                    <input type="text" placeholder="Subject" />
                    <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
                    <button type="submit" className='normal'>Send Message</button>
                </form>
                <div className="people">
                    <div>
                        <img src={p1} alt="" />
                        <p><span>John Doe</span>Senior Marketing Manager<br /> Phone: +000 123 000 77 88<br />Email:Contact@example.com</p>
                    </div>
                    <div>
                        <img src={p2} alt="" />
                        <p><span>John Doe</span>Senior Marketing Manager<br /> Phone: +000 123 000 77 88<br />Email:Contact@example.com</p>
                    </div>
                    <div>
                        <img src={p3} alt="" />
                        <p><span>John Doe</span>Senior Marketing Manager<br /> Phone: +000 123 000 77 88<br />Email:Contact@example.com</p>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Contact
