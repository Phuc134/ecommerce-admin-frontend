import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Fail = () => {
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
        color: '#dc3545',
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
    useEffect(() => {
        localStorage.removeItem("session_id");
    }, []);
    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Payment Failed</h1>
            <p style={paragraphStyle}>Unfortunately, your payment could not be processed. Please try again.</p>
            <Link
                to="/"
                style={linkStyle}
                onMouseOver={e => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = linkStyle.backgroundColor}
            >
                Try Again
            </Link>
        </div>
    );
};

export default Fail;
