import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc", {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const POST = async (req: NextRequest) => {
    const {totalSum} = await req.json()
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-04-10" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalSum, // $15.29
    currency: "rub",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx'
  });
};
