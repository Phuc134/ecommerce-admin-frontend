import React, {useEffect} from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import {Link, useLocation} from "react-router-dom";
import {HiOutlineArrowLeft} from "react-icons/hi";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {getBlog} from "../features/blogs/blogSlice";
import blog from "./Blog";

const SingleBlog = () => {
    const blogState = useSelector((state)=> state?.blog?.singleBlog);
    const dispatch = useDispatch();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[2];
    useEffect(() => {
        getblog();
        console.log(blogState);
    }, []);
    const getblog = () => {
        dispatch(getBlog(getBlogId))
    }
  return (
      <>
        <Meta title={blogState?.title}/>
        <BreadCrumb title={blogState?.title}/>
          <Container class1="blog-wrapper home-wrapper-2 py-5">
              <div className="row">
                  <div className="col-12">
                      <div className="single-blog-card">
                          <Link to='/blogs' className="d-flex align-items-center gap-10">
                              <HiOutlineArrowLeft className="fs-4"/> Go back to blogs
                          </Link>
                          <h3 className="title">
                              {blogState?.title}
                          </h3>
                          <img src={blogState?.images[0].url ? blogState?.images[0].url : "/images/blog-1.jpg"} className="img-fluid w-100 my-4" alt="blog"/>
                          <p dangerouslySetInnerHTML={{__html: blogState?.description}}></p>

                      </div>
                  </div>
              </div>
          </Container>

      </>
  );
};

export default SingleBlog;