import React, { useEffect } from 'react';
import ReactStars from "react-rating-stars-component/dist/react-stars";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import {getUserProductWishlist} from "../features/user/userSlice";

const ProductCard = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { grid, data } = props;

    const wishlist = useSelector(state => state?.auth?.wishlist?.wishlist);
    const authState = useSelector(state => state.auth);

    const addToWish = (id) => {
        if (!authState?.user) {
            navigate('/login');
        } else {
            dispatch(addToWishlist(id));
            setTimeout(() => {
                dispatch(getUserProductWishlist());


            },200);        }
    };

    const isInWishlist = (id) => {
        return wishlist?.some(item => item._id === id);
    };

    // Force re-render when wishlist changes
    useEffect(() => {}, [wishlist]);

    return (
        <>
            {Array.isArray(data) && data.length > 0 && data.map((item, index) => {
                const inWishlist = isInWishlist(item?._id);

                return (
                    <div key={index} className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
                        <div className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                                <button
                                    className="border-0 bg-transparent"
                                    onClick={() => addToWish(item?._id)}
                                >
                                    <img
                                        style={{width:"18px"}}
                                        src={inWishlist ?  "/images/heart.png" : "/images/wish.svg"}
                                        alt="wishlist"
                                    />
                                </button>
                            </div>
                            <div className="product-image">
                                <img src={item?.images[0]?.url ? item?.images[0]?.url : "/images/watch-1.jpeg"} className="img-fluid mx-auto" width={160} alt="product image" />
                                <img src={item?.images[1]?.url ? item?.images[1]?.url : "/images/watch-1.jpeg"} className="img-fluid mx-auto" width={160} alt="product image" />
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
                                    activeColor="#ffd700"
                                />
                                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                                   dangerouslySetInnerHTML={{ __html: item?.description }}>
                                </p>
                                <p className="price">$ {item?.price}</p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-10">
                                    <Link to={`/product/` + item?._id} className="border-0 bg-transparent">
                                        <img src="/images/view.svg" alt="view" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductCard;
