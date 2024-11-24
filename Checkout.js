import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
      return;
    }

    // Here you would typically make a call to your backend to process the payment
    // For demo purposes, we'll just simulate a successful payment
    setTimeout(() => {
      setSucceeded(true);
      setProcessing(false);
      // Clear cart after successful payment
      localStorage.removeItem('cart');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Card details
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
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="btn btn-primary"
      >
        {processing ? 'Processing...' : `Pay $${total}`}
      </button>

      {succeeded && (
        <div className="success-message">
          Payment successful! Your digital products will be available shortly.
        </div>
      )}
    </form>
  );
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    const cartTotal = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(cartTotal.toFixed(2));
  }, []);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="order-total">
          <strong>Total:</strong>
          <strong>${total}</strong>
        </div>
      </div>

      <div className="payment-section">
        <h3>Payment Details</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
