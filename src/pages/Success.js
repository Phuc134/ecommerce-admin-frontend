import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {base_url, config} from "../utils/axiosConfig";
import {useDispatch, useSelector} from "react-redux";
import {createOrderUser} from "../features/user/userSlice";

const Success = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state?.auth);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const session_id = localStorage.getItem('session_id');
                const response = await axios.post(`${base_url}user/cart/payment-verification`, { session_id }, config);
                console.log('Payment verification response:', response.data);
                if (response.data.payment_status == 'paid' ) {
                    const order = JSON.parse(localStorage.getItem('order'));
                    //create order
                    dispatch(createOrderUser(order));

                }
                localStorage.removeItem("session_id");
                localStorage.removeItem("order");


            } catch (error) {
                console.error('Error verifying payment:', error);
            }
        };

        verifyPayment();
    }, []);
    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '2.5em',
        marginBottom: '20px',
        color: '#28a745',
    };

    const paragraphStyle = {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '30px',
    };

    const linkStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '1.1em',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
    };

    const linkHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Payment Successful!</h1>
            <p style={paragraphStyle}>Your payment was processed successfully. Thank you for your purchase!</p>
            <Link
                to="/"
                style={linkStyle}
                onMouseOver={e => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = linkStyle.backgroundColor}
            >
                Go back to Home
            </Link>
        </div>
    );
};

export default Success;
