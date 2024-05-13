import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Header from '@/components/Header';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Get client secret from environment variable
      const clientSecret = import.meta.env.VITE_STRIPE_SECRET_KEY;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        console.log(result.paymentIntent);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Payment failed. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
  <div className="flex flex-col text-center">
    <form className='w-[300px]' onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button className='inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mt-4'>Submit</button>
    </form>
  </div>
</div>
  );
};

export default CheckoutForm;
