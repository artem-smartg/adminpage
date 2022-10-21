import React from "react";
import  {Container}  from 'react-bootstrap';

const ErrorPages = () => {

    return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: window.innerHeight }}
            >
                <h1 style={{color:'red'}}>Error, not found</h1>
            </Container>
    );
}

export default ErrorPages;