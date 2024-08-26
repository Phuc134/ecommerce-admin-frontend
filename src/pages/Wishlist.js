import React, {useEffect} from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {getUserProductWishlist} from "../features/user/userSlice";
import {addToWishlist} from "../features/products/productSlice";

const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistFromDb();
    }, []);
    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist());
    }

    const  wishlistState = useSelector( state => state.auth?.wishlist?.wishlist);

    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch(getUserProductWishlist());


        },200);
    }
  return (
    <>
        <Meta title={"Wishlist"}/>
        <BreadCrumb title={"Wishlist"}/>
        <Container class1="wishlish-wrapper home-wrapper-2 py-5">
            <div className="row">
                {
                    wishlistState?.length == 0 && <div className="text-center fs-3">
                    No data
                    </div>
                }
                {
                    wishlistState?.map((item, index) => {
                        return (
                            <div key={index} className="col-3">
                                <div className="wishlist-card position-relative">
                                    <div className="wishlist-card-image">
                                        <img onClick={() => {removeFromWishlist(item?._id)}}
                                             src="images/cross.svg"
                                             alt="cross"
                                             className="position-absolute cross img-fluid"/>
                                    </div>
                                    <div className="wishlist-card-image">
                                        <img src={item?.images[0]?.url ? item?.images[0]?.url : "/images/watch.jpg"} className="img-fluid w-100" alt="watch"/>
                                    </div>
                                    <div className="py-3 px-3">
                                        <h5 className="title" dangerouslySetInnerHTML={{__html:item?.title}}>
                                        </h5>
                                        <h6 className="price">$ {item?.price}</h6>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </Container>
    </>
  );
};

export default Wishlist;