import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm'; // Import your CheckoutForm component

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHER_KEY);

const CheckOut = () => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    // Retrieve the query string from the current URL
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    // Get the amount parameter from the query string and convert it to a number
    const amountFromParams = Number(params.get('amount'));
    setAmount(amountFromParams);
  }, []);

  if (!amount) {
    // If amount is not yet available, render loading or handle accordingly
    return <div>Loading...</div>;
  }

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: amount * 100 // Multiply by 100 to convert to cents
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default CheckOut;
