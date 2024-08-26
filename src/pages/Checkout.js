import React, { useEffect, useState } from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { loadStripe } from "@stripe/stripe-js";
import { base_url, config } from "../utils/axiosConfig";
import axios from "axios";
const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("First Name is Required"),
    address: yup.string().required("Address Details are Required"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City is Required"),
    country: yup.string().required("Country is Required"),
    other: yup.string().required("Other is Required"),
    pincode: yup.string().required("Pincode is Required"),
})
const Checkout = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state?.auth?.cartProducts);
    const [totalAmount, setTotalAmount] = useState(null);

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < cartState?.length; i++) {
            sum = sum + (Number(cartState[i].quantity) * cartState[i].price);
        }
        setTotalAmount(sum)
    }, [cartState]);
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            other: "",
            pincode: ""
        },
        validationSchema: shippingSchema,
        onSubmit: async (values) => {
            const stripe = await loadStripe("pk_test_51Po33nRqmFXGjdS2Xh5egdIVs8PJNBGWsYVjNjCbRDkktdfKrK4JDP13WRmdJBUibBSstPGMnIcPXh1CzByLEEcV00SACFCGSz");

            const body = {
                products: cartState,
                info: values,
                total: totalAmount
            };
            const order = {
                orderItems: cartState.map(item => ({
                    product: item?.productId?._id,
                    color: item?.color?._id,
                    quantity: item?.quantity,
                    price: item?.price
                })),
                info: values,
                totalPrice: totalAmount
            }
            console.log(order);

            localStorage.setItem('order', JSON.stringify(order));
            try {
                // Make the request to your backend to create a checkout session
                const response = await axios.post(`${base_url}user/cart/create-checkout-session`, body, config);

                // Extract the session ID from the response data
                const { id: sessionId } = response.data;

                // Redirect to Stripe checkout
                localStorage.setItem('session_id', sessionId);
                const result = await stripe.redirectToCheckout({
                    sessionId: sessionId,
                });

                if (result.error) {
                    console.error('Stripe checkout error:', result.error.message);
                }

            } catch (error) {
                console.error('Error during checkout process:', error);
            }


        }
    })
    return (
        <>
            <Meta title={"Checkout"} />
            <BreadCrumb title={"Checkout"} />
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Developer </h3>
                            <nav style={{ "--bs-breadcrumb-divider": '>' }}
                                aria-label="breadrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link className="text-dark total-price" to='/cart'>Cart</Link>
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item " aria-current="page">
                                        Information
                                    </li>
                                    &nbsp; /

                                    <li className="breadcrumb-item active total-price" aria-current="page">
                                        Shipping
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active total-price" aria-current="page">
                                        Payment
                                    </li>
                                </ol>
                            </nav>
                            <h4 className="title total">
                                Contact Information
                            </h4>
                            <p className="user-details">
                                test@gmail.com
                            </p>
                            <h4 className="mb-3">Shipping Address</h4>
                            <form onSubmit={formik.handleSubmit} action="" className="d-flex gap-15 flex-wrap justify-content-between">
                                <div className="w-100">
                                    <select name="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        id=""
                                        className="form-control form-select">
                                        <option value="" selected disabled>
                                            Select Country
                                        </option>
                                        <option value="vietnam">
                                            Viet Nam
                                        </option>
                                    </select>
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.country && formik.errors.country
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                        placeholder="First Name"
                                        className="form-control"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange("firstName")}
                                        onBlur={formik.handleBlur("firstName")}
                                    />
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.firstName && formik.errors.firstName
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                        placeholder="Last Name"
                                        className="form-control"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange("lastName")}
                                        onBlur={formik.handleBlur("lastName")} />
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.lastName && formik.errors.lastName
                                        }
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input type="text"
                                        placeholder="Address"
                                        className="form-control"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")} />
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.address && formik.errors.address
                                        }
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input type="text"
                                        placeholder="Apartment, Suite, etc"
                                        className="form-control"
                                        name="address"
                                        value={formik.values.other}
                                        onChange={formik.handleChange("other")}
                                        onBlur={formik.handleBlur("other")} />
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.other && formik.errors.other
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                        placeholder="City"
                                        className="form-control"
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")} />
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.city && formik.errors.city
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select name="state"
                                        className="form-control form-select"
                                        id=""
                                        value={formik.values.state}
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}>
                                        <option value="" selected disabled>Select State</option>
                                        <option value="test" >Test</option>

                                    </select>
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.state && formik.errors.state
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                        placeholder="ZipCode"
                                        className="form-control"
                                        name="pincode"
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")} />
                                    <div className="error ms-2 my-1">
                                        {
                                            formik.touched.pincode && formik.errors.pincode
                                        }
                                    </div>
                                </div>

                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to='/cart' className="text-dark"><BiArrowBack className="me-2" /> Return to Cart</Link>
                                        <Link to='/store' className="button">Continue to Shipping</Link>
                                        <button className="button" type="submit">Place Order</button>

                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {
                                cartState && cartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                            <div className="w-75 d-flex gap-10">
                                                <div className="w-25 position-relative">
                                                    <span style={{ top: "-10px", right: "2px" }} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                                                        {item?.quantity}
                                                    </span>
                                                    <img width={100} height={100} src={item?.productId?.images[0]?.url ? item?.productId?.images[0]?.url : "/images/watch.jpg"} alt="product" />
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.productId?.title}</h5>
                                                    <p className="total-price">{item?.color?.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="total">$ {item?.price * item?.quantity}</h5>
                                                <p></p>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">Subtotal</p>
                                <p className="total-price">$ {totalAmount ? totalAmount : "0"}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price"> $ 5</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">$ {totalAmount ? totalAmount + 5 : "0"}</h5>
                        </div>

                    </div>
                </div>

            </Container>
        </>
    );
};

export default Checkout;