import React, {useEffect, useState} from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from 'react-image-zoom';
import Color from "../components/Color";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {TbGitCompare} from "react-icons/tb";
import {AiOutlineHeart} from "react-icons/ai";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {getOneProduct} from "../features/products/productSlice";
import {toast} from "react-toastify";
import {addProductToCart, getUserCart} from "../features/user/userSlice";

const SingleProduct = () => {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const productState = useSelector( state => state?.product?.singleProduct);
    const cartState = useSelector(state => state?.auth?.cartProducts);
    useEffect(() => {
        dispatch(getOneProduct(getProductId));
        dispatch(getUserCart())
    }, []);
    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true);
            }
        }
    }, []);

    const uploadCart = () => {
        if (color == null) {
            toast.error("Please Choose Color");
            return false;
        }
        else {
            dispatch(addProductToCart({
                productId: productState?._id,
                quantity,
                color,
                price: productState?.price

            }));
            navigate('/cart');
        }
    }

    const [orderProduct, setorderedProduct] = useState(true);
    const props = {
        width: 600,
        height: 500,
        zoomWidth: 500,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
    }
    return (

    <>
        <Meta title={"Product Name"}/>
        <BreadCrumb title={"Product Name"}/>
        <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-6">
                    <div className="main-product-image">
                        <div>
                            <ReactImageZoom {...props} />
                        </div>
                    </div>
                    <div className="other-product-images d-flex flex-wrap gap-15">
                        {
                            productState?.images.map((item, index)=> {
                                return (
                                    <div>
                                        <img className="img-fluid"
                                             src={item?.url}
                                             alt="watch"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="main-product-details">
                        <div className="border-bottom">
                            <h3 className="title">{productState?.title}</h3>
                        </div>
                        <div className="border-bottom py-3">
                            <p className="price">$ {productState?.price}</p>
                            <div className="d-flex align-items-center gap-10">
                                <ReactStars count={5}
                                            size={24}
                                            value={productState?.totalrating?.toString()}
                                            edit={false}
                                            activeColor="#ffd700"/>
                                <p className="mb-0 t-review">( 2 Reviews)</p>
                            </div>
                            <a href="#review">Write a Review</a>
                        </div>
                        <div className="border-bottom py-3">

                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Type: </h3>
                                <p className="product-data">Watch</p>
                            </div>

                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Brand: </h3>
                                <p className="product-data">{productState?.brand}</p>

                            </div>

                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Category: </h3>
                                <p className="product-data">{productState?.category}</p>

                            </div>

                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Tags: </h3>
                                <p className="product-data">{productState?.tags}</p>

                            </div>

                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Availablity: </h3>
                                <p className="product-data">In Stock</p>
                            </div>

                            <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                <h3 className="product-heading">Size: </h3>
                                <div className="d-flex flex-wrap gap-15">
                                    <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">XXL</span>

                                </div>
                            </div>

                            {
                                alreadyAdded ===false &&
                                <>
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <h3 className="product-heading">Color: </h3>
                                        <Color setColor = {setColor} colorData = {productState?.color}/>
                                    </div>
                                </>
                            }

                            <div className="d-flex gap-15 flex-row mt-2 mb-3 align-items-center">
                                {
                                    alreadyAdded === false &&
                                    <>
                                        <h3 className="product-heading">Quantity: </h3>
                                        <div className="">
                                            <input
                                                type="number"
                                                name=""
                                                min={1}
                                                max={10}
                                                className="form-control"
                                                style={{width: "70px"}}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                value={quantity}
                                                id=""/>

                                        </div>
                                    </>

                                }
                                <div className={'d-flex align-items-center gap-30 ms-5' + alreadyAdded ? "ms-0": "ms-5"}>
                                    <button className="button border-0"
                                            type="submit"
                                            onClick={() => {alreadyAdded ? navigate('/cart'):uploadCart(productState?._id)}}>
                                        {alreadyAdded? "Go To Cart" : "Add to Cart"}
                                    </button>
                                    <button  className="button signup">
                                        Buy It Now
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-15">
                                <div>
                                    <a href=""> <TbGitCompare className="fs-5"/> Add to Compare</a>
                                </div>
                                <div>
                                    <a href=""> <AiOutlineHeart className="fs-5"/> Add to Wishlist</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

        <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="col-12">
                <h4>Description</h4>
                <div className="bg-white p-3">
                    <p dangerouslySetInnerHTML={{__html: productState?.description}}></p>
                </div>

            </div>

        </Container>

        <Container class1="reviews-wrapper home-wrapper-2">
            <div className="col-12">
                <h3 id='review'>Reviews</h3>
                <div className="review-inner-wrapper">
                    <div className="review-head d-flex justify-content-between align-items-end">
                        <div>
                            <h4 className="mb-2">Customer Reviews</h4>
                            <div className="d-flex align-items-center gap-10">
                                <ReactStars count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#ffd700"/>
                                <p className="mb-0">Based on 2 Reviews</p>
                            </div>
                        </div>
                        {
                            orderProduct && (
                                <div>
                                    <a className="text-dark text-decoration-underline">Write a Reviews</a>
                                </div>
                            )
                        }
                    </div>
                    <div  className="rewview-form py-4">
                        <h4>Write a Review</h4>
                        <form action="" className="d-flex flex-column gap-15">
                            <div>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value='3'
                                    edit={true}
                                    activeColor="#ffd700"/>
                            </div>
                            <div>
                                <textarea name="" id="" className="w-100 form-control" placeholder="Comments" cols="30" rows="4"></textarea>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="button border-0" style={{width: "20%"}}>Submit Review</button>
                            </div>
                        </form>
                    </div>
                    <div className="reviews mt-4">
                        <div className="review">
                            <div className="d-flex gap-10 align-items-center">
                                <h6 className="mb-0">Developers</h6>
                                <ReactStars count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#ffd700"/>
                            </div>
                            <p className="mt-3">asdgukdsakjdsvacjkhcvdsjksdcvjhshacdsdakcacjhshjdvhjsdajkvcsakvjacskjacvdhj</p>

                        </div>
                    </div>
                </div>
            </div>
        </Container>

        <Container class1="reviews-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">Our Popular Products</h3>
                </div>
            </div>
            <div className="row">
                <ProductCard/>
            </div>
        </Container>
    </>
  );
};

export default SingleProduct;