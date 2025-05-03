import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, CircularProgress } from '@mui/material';

const PaymentForm = ({ clientSecret, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        onError(result.error);
      } else if (result.paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} style={{ marginTop: 16 }}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe || loading}
        sx={{ mt: 2, width: '100%' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Pay Now'}
      </Button>
    </form>
  );
};

export default PaymentForm; 