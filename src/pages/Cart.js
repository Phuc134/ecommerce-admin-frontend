import React, { useEffect, useState } from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const userCartState = useSelector(state => state.auth.cartProducts);
    const [totalAmount, setTotalAmount] = useState(0);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        dispatch(getUserCart());
    }, []);

    useEffect(() => {
        // Initialize quantities state and calculate total amount
        const initialQuantities = {};
        let initialTotal = 0;

        userCartState?.forEach(item => {
            initialQuantities[item._id] = item.quantity;
            initialTotal += item.quantity * item.price;
        });

        setQuantities(initialQuantities);
        setTotalAmount(initialTotal);
    }, [userCartState]);

    const handleQuantityChange = (e, item) => {
        const newQuantity = Number(e.target.value);
        const updatedQuantities = {
            ...quantities,
            [item._id]: newQuantity,
        };
        setQuantities(updatedQuantities);

        // Update the cart product in the backend
        dispatch(updateCartProduct({
            cartItemId: item._id,
            quantity: newQuantity,
        })).then(() => {
            // Calculate the new total amount after updating the quantity
            let newTotal = 0;
            userCartState.forEach(cartItem => {
                newTotal += (updatedQuantities[cartItem._id] || cartItem.quantity) * cartItem.price;
            });
            setTotalAmount(newTotal);
            dispatch(getUserCart());

        });
    };

    const deletedACartProduct = (id) => {
        dispatch(deleteCartProduct(id)).then(() => {
            dispatch(getUserCart());
        });
    };

    return (
        <>
            <Meta title={"Cart"} />
            <BreadCrumb title={"Cart"} />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>
                        {
                            userCartState && userCartState.map((item, index) => (
                                <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                            <img src="/images/watch.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="w-75">
                                            <p>{item?.productId?.title}</p>
                                            <p className="d-flex gap-3">Color:
                                                <ul className="colors ps-0">
                                                    <li style={{ backgroundColor: item?.color.title }}>
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2">
                                        <h5 className="price">$ {item?.price}</h5>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15">
                                        <div>
                                            <input
                                                className="form-control"
                                                type="number"
                                                min={1}
                                                value={quantities[item._id] || item.quantity}
                                                onChange={(e) => handleQuantityChange(e, item)}
                                                max={10} />
                                        </div>
                                        <div>
                                            <AiFillDelete className="text-danger" onClick={() => deletedACartProduct(item?._id)} />
                                        </div>
                                    </div>
                                    <div className="cart-col-4">
                                        <h5 className="price">$ {item?.price * (quantities[item._id] || item.quantity)}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to='/store' className="button">
                                Continue to Shopping
                            </Link>
                            {
                                totalAmount > 0 &&
                                <div className="d-flex flex-column align-items-end">
                                    <h4>Subtotal: ${totalAmount.toFixed(2)}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to="/checkout" className="button">Checkout</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Cart;
