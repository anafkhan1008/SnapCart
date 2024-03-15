import React from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {

    const { id } = useParams();


    return (
        <Container maxWidth="sm">
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" component="h1" style={{ textTransform: 'uppercase' }}>
                    Order Successful
                </Typography>
                <Typography variant="body1">
                    Reference No. {id}
                </Typography>
            </div>
        </Container>
    );
};

export default PaymentSuccess;
