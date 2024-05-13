// Importing necessary modules
import { Response } from "express";
import { stripe } from '@/utils/stripe'; // Assuming you've created a util file for stripe setup

// Handling POST request
export async function createPaymentIntent(req, res) {
  // Parsing request body to JSON
  const data = req.body;
  // Extracting amount from request data
  const amount = data.amount;

  try {
    // Creating a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // Converting amount to cents
      currency: "USD",
    });
    // Returning the client secret for the created payment intent
    return res.json(paymentIntent.client_secret);
  } catch (error) {
    // Returning error response in case of failure
    return res.status(400).json(error);
  }
}
