import React, {useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import {services} from "../utils/Data";
import {useDispatch, useSelector} from "react-redux";
import {getAllBlogs} from "../features/blogs/blogSlice";
import moment from "moment/moment";
import {addToWishlist, getAllProduct} from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
const Home = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    const productState = useSelector((state) => state.product.product);
    const navigate = useNavigate();
    console.log(productState);
    const dispatch = useDispatch();
    const addToWish = (id) => {
        dispatch(addToWishlist(id));
    }
    useEffect(() => {
        getblogs();
        getproducts();
    }, []);
    const getblogs = () => {
        dispatch(getAllBlogs());
    }

    const getproducts = () => {
        dispatch(getAllProduct());
    }
    return (
       <>
           <Container class1="home-wrapper-1 py-5">
               <div className="row">
                   <div className="col-6">
                       <div className="main-banner position-relative p-3">
                           <img src="images/main-banner-1.jpg" className="img-fluid rounded-3" alt="main banner"/>
                           <div className="main-banner-content position-absolute">
                               <h4>SUPERCHARGED FOR PROS.</h4>
                               <h5>iPad S13+ Pro.</h5>
                               <p>From $999.000 <br/> or $43.62/mo</p>
                               <Link className="button">BUY NOW</Link>
                           </div>
                       </div>
                   </div>
                   <div className="col-6">
                       <div className="d-flex gap-10 flex-wrap justify-content-between align-items-center">
                           <div className="small-banner position-relative">
                               <img src="images/catbanner-01.jpg" className="img-fluid rounded-3" alt="main banner"/>
                               <div className="small-banner-content position-absolute">
                                   <h4>NEW ARRIVAL</h4>
                                   <h5>But Ipad Air</h5>
                                   <p>From $999.000 <br/> or $43.62/mo</p>
                               </div>
                           </div>

                           <div className="small-banner position-relative">
                               <img src="images/catbanner-02.jpg" className="img-fluid rounded-3" alt="main banner"/>
                               <div className="small-banner-content position-absolute">
                                   <h4>Best Sake</h4>
                                   <h5>iPad S13+ Pro.</h5>
                                   <p>From $999.000 <br/> or $43.62/mo</p>
                               </div>
                           </div>

                           <div className="small-banner position-relative">
                               <img src="images/catbanner-03.jpg" className="img-fluid rounded-3" alt="main banner"/>
                               <div className="small-banner-content position-absolute">
                                   <h4>NEW ARRIVAL</h4>
                                   <h5>But Ipad Air</h5>
                                   <p>From $999.000 <br/> or $43.62/mo</p>
                               </div>
                           </div>


                           <div className="small-banner position-relative">
                               <img src="images/catbanner-04.jpg" className="img-fluid rounded-3" alt="main banner"/>
                               <div className="small-banner-content position-absolute">
                                   <h4>NEW ARRIVAL</h4>
                                   <h5>But Ipad Air</h5>
                                   <p>From $999.000 <br/> or $43.62/mo</p>
                               </div>
                           </div>



                       </div>
                   </div>

               </div>

           </Container>
           <Container class1="home-wrapper-2 py-5">
               <div className="row">
                   <div className="col-12">
                       <div className="services d-flex align-items-center justify-content-between">
                           {
                               services?.map((i, j) => {
                                   return (
                                       <div className="d-flex align-items-center gap-15" key={j}>
                                           <img src={i.image} alt="service"/>
                                           <div>
                                               <h6>{i.title}</h6>
                                               <p className="mb-0">{i.tagline}</p>
                                           </div>
                                       </div>
                               ) })
                           }
                       </div>
                   </div>
               </div>
           </Container>
           <Container class1="home-wrapper-3 py-5">
               <div className="row">
                   <div className="col-12">
                       <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Music & Gaming</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/camera.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Cameras</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/camera.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Smart Tv</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/tv.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Smart Watch</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/headphone.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Music & Gaming</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/camera.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Cameras</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/camera.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Smart Tv</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/tv.jpg" alt="camera"/>
                           </div>
                           <div className="d-flex gap-10 align-items-center">
                               <div>
                                   <h6>Smart Watch</h6>
                                   <p>10 Items</p>
                               </div>
                               <img src="images/headphone.jpg" alt="camera"/>
                           </div>


                       </div>
                   </div>
               </div>

           </Container>
           <Container class1="featured-wrapper py-5 home-wrapper-2">
               <div className="row">
                   <div className="col-12">
                       <h3 className="section-heading">
                           Featured Collection
                       </h3>
                   </div>
                   {
                       productState && productState?.map((item, index)=> {
                           if (item.tags == "featured"){
                               return (
                                   <div key={index} className={"col-3"}>
                                       <div className="product-card position-relative">
                                           <div className="wishlist-icon position-absolute">
                                               <button className="border-0 bg-transparent" onClick={(e) => {addToWish(item?._id)}} ><img src="/images/wish.svg" alt="wishlist"/></button>
                                           </div>
                                           <div className="product-image">
                                               <img src={item?.images[0]?.url ? item?.images[0]?.url:"/images/watch-1.jpeg"} className="img-fluid mx-auto" width={160} alt="product image"/>
                                               <img src={item?.images[1]?.url ? item?.images[1]?.url:"/images/watch-1.jpeg"} className="img-fluid mx-auto" width={160}  alt="product image"/>
                                           </div>
                                           <div className="product-details">
                                               <h6 className="brand">{item?.brand}</h6>
                                               <h5 className="product-title">
                                                   {item?.title}
                                               </h5>
                                               <ReactStars
                                                   count={5}
                                                   size={24}
                                                   value={item?.totalrating.toString()}
                                                   edit={false}
                                                   activeColor="#ffd700"/>
                                               <p className="price">$ {item?.price}</p>
                                           </div>
                                           <div className="action-bar position-absolute">
                                               <div className="d-flex flex-column gap-10">
                                                   <button className="border-0 bg-transparent">
                                                       <img src="/images/prodcompare.svg" alt="compare"/>
                                                   </button>
                                                   <button className="border-0 bg-transparent">
                                                       <img onClick={() => navigate("/product/:" + item?._id)} src="/images/view.svg" alt="view"/>
                                                   </button>
                                                   <button className="border-0 bg-transparent">
                                                       <img src="/images/add-cart.svg" alt="addcart"/>
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                   </div>

                               )
                           }
                       })
                   }
               </div>

           </Container>
           <Container class1="special-wrapper py-5 home-wrapper-2">
               <div className="row">
                   <div className="col-12">
                       <h3 className="section-heading">Special Products</h3>
                   </div>
               </div>
               <div className="row">
                   {
                       productState && productState?.map((item, index)=> {
                         if (item.tags == "special"){
                             return <SpecialProduct
                                 key={index}
                                 id={item?._id}
                                 brand ={item?.brand}
                                 title ={item?.title}
                                 totalrating = {item?.totalrating.toString()}
                                 price={item?.price}
                                 sold={item?.sold}
                                 quantity = {item?.quantity}
                             />
                         }
                       })
                   }
               </div>

           </Container>
           <Container class1="famous-wrapper py-5 home-wrapper-2">
               <div className="row">
                   <div className="col-3">
                       <div className="famous-card position-relative">
                           <img src="images/famous-1.webp" className="img-fluid" alt="famous"/>
                           <div className="famous-content position-absolute">
                               <h5>Big Screen</h5>
                               <h6>Smart Watch Series 7</h6>
                               <p>From $399 or $16.62/mo. for 24 mo.*</p>
                           </div>

                       </div>
                   </div>

                   <div className="col-3">
                       <div className="famous-card position-relative">
                           <img src="images/famous-2.webp" className="img-fluid" alt="famous"/>
                           <div className="famous-content position-absolute">
                               <h5 className="text-dark">Big Screen</h5>
                               <h6 className="text-dark">Smart Watch Series 7</h6>
                               <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
                           </div>

                       </div>
                   </div>

                   <div className="col-3">
                       <div className="famous-card position-relative">
                           <img src="images/famous-3.webp" className="img-fluid" alt="famous"/>
                           <div className="famous-content position-absolute">
                               <h5 className="text-dark">Big Screen</h5>
                               <h6 className="text-dark">Smart Watch Series 7</h6>
                               <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
                           </div>

                       </div>
                   </div>

                   <div className="col-3">
                       <div className="famous-card position-relative">
                           <img src="images/famous-4.webp" className="img-fluid" alt="famous"/>
                           <div className="famous-content position-absolute">
                               <h5 className="text-dark">Big Screen</h5>
                               <h6 className="text-dark">Smart Watch Series 7</h6>
                               <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
                           </div>

                       </div>
                   </div>

               </div>

           </Container>
           <Container class1="popular-wrapper py-5 home-wrapper-2">
               <div className="row">
                   <div className="col-12">
                       <h3 className="section-heading">
                           Our Popular Products
                       </h3>
                   </div>
                   <div className="row">
                       {
                           productState && productState?.map((item, index)=> {
                               if (item.tags == "popular"){
                                   return (
                                       <div key={index} className={"col-3"}>
                                           <div className="product-card position-relative">
                                               <div className="wishlist-icon position-absolute">
                                                   <button className="border-0 bg-transparent" onClick={(e) => {addToWish(item?._id)}} ><img src="/images/wish.svg" alt="wishlist"/></button>
                                               </div>
                                               <div className="product-image">
                                                   <img src={item?.images[0]?.url ? item?.images[0]?.url:"/images/watch-1.jpeg"} className="img-fluid mx-auto" width={160} alt="product image"/>
                                                   <img src={item?.images[1]?.url ? item?.images[1]?.url:"/images/watch-1.jpeg"} className="img-fluid mx-auto" width={160}  alt="product image"/>
                                               </div>
                                               <div className="product-details">
                                                   <h6 className="brand">{item?.brand}</h6>
                                                   <h5 className="product-title">
                                                       {item?.title}
                                                   </h5>
                                                   <ReactStars
                                                       count={5}
                                                       size={24}
                                                       value={item?.totalrating.toString()}
                                                       edit={false}
                                                       activeColor="#ffd700"/>
                                                   <p className="price">$ {item?.price}</p>
                                               </div>
                                               <div className="action-bar position-absolute">
                                                   <div className="d-flex flex-column gap-10">

                                                       <button className="border-0 bg-transparent">
                                                           <img onClick={() => navigate("/product/" + item?._id)} src="/images/view.svg" alt="view"/>
                                                       </button>

                                                   </div>
                                               </div>
                                           </div>
                                       </div>

                                   )
                               }
                           })
                       }
                   </div>

               </div>

           </Container>
           <Container  class1="marque-wrapper py-5">
               <div className="row">
                   <div className="col-12">
                       <div className="marquee-inner-wrapper card-wrapper">
                           <Marquee className="d-flex">
                               <div className="mx-4 w-25">
                                   <img src="images/brand-01.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-02.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-03.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-04.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-05.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-06.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-07.png" alt="brand"/>
                               </div>
                               <div className="mx-4 w-25">
                                   <img src="images/brand-08.png" alt="brand"/>
                               </div>
                           </Marquee>
                       </div>
                   </div>
               </div>

           </Container>
           <Container class1="blog-wrapper py-5 home-wrapper-2">
               <div className="row">
                   <div className="col-12">
                       <h3 className="section-heading">
                           Our Latest Blogs
                       </h3>
                   </div>
               </div>
               <div className="row">
                   {
                       blogState ?
                           blogState?.map((item, index)=> {
                               return (
                                   <div className="col-3" key={index}>
                                       <BlogCard
                                           id={item?._id}
                                           title={item?.title}
                                           description={item?.description}
                                           image={item?.images[0]?.url}
                                           date={moment(item?.created_at).format("MMMM Do YYYY, h:mm a")}/>
                                   </div>
                               )
                           }) : ""
                   }
               </div>
           </Container>
       </>
    )
}

export default Home
