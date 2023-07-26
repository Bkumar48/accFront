import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import b1 from "../assest/blog/b1.jpg";
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner'
const Blog = () => {

    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogPerPage, setBlogPerPage] = useState(3);


    const fetchBlog = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/blogs?blogId`);
            setBlog(res.data.proData);
            console.log(res.data.proData)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    // if (loading) {
    //     return <RotatingLines
    //         strokeColor="grey"
    //         strokeWidth="5"
    //         animationDuration="0.75"
    //         width="96"
    //         visible={true}
    //         className='loader'
    //     />
    // }
    return (
        <>
            <section id="page-header" className='blog-header'>
                <h2>#readmore</h2>
                <p>Read all case studies about our products</p>
            </section>
            {loading ? (
                <section id="blog">
                    <div id='loader'>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}

                        />
                    </div>
                </section>) : (
                <><section id="blog">
                    {
                        blog.map((blog) => (
                            <div className="blog-box">
                                <div className="blog-img">
                                    <img src={"https://demo.adaired.com/demoadaired/upload/blog/"+blog.image} alt="blog" />
                                </div>
                                <div className="blog-details">
                                    <h4>{blog.title}</h4>
                                    <p>{blog.description.slice(0, 150)}...</p>
                                    <Link to="#" className="btn">Continue Reading</Link>
                                </div>
                                <h1>{new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })}</h1>
                            </div>
                        ))
                    }
                </section>

                </>

            )}
            <section id="pagination" className="section-p1">
                <Link to="#" className="btn">1</Link>
                <Link to="#" className="btn">2</Link>
                <Link to="#" className="btn"><i class="fa fa-long-arrow-alt-right"></i></Link>
            </section>
        </>
    )
}

export default Blog
