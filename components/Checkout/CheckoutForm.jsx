import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2"; // Correctly import SweetAlert2
import { useEffect, useState } from "react";

import UseAuth from "../../src/hooks/UseAuth/UseAuth";
import UseAxiosSecure from "../../src/hooks/UseAxiosSecure/UseAxiosSecure";

const CheckoutForm = ({ bookingData }) => {
  const {
    bootCampPrice, // Use correct variable name
    user,
    bootCampName,
    bootCampMentors,
  } = bookingData;

  console.log(bookingData);




  const stripe = useStripe();


  const elements = useElements();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = UseAxiosSecure();

  // useEffect to create payment intent when bootCampPrice changes
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (bootCampPrice > 0) { // Correct variable reference
          const response = await axiosSecure.post("/create_payment_intent", {
            price: bootCampPrice,
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to create payment intent. Please try again later.");
      }
    };

    createPaymentIntent();
  }, [axiosSecure, bootCampPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",

          },
        },
      });

    if (paymentError) {
      setError(paymentError.message);
    } else {
      console.log("Payment confirmed:", paymentIntent);
      setError("");
      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful");
        console.log(`${paymentIntent.id} is the payment intent id`);
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email || "Anonymous",
          price: bootCampPrice,
          planName: bootCampName,
          date: new Date().toLocaleDateString(),
          status: "pending",
          transactionId: paymentIntent.id,
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your payment has been successfully processed!",
          });
        }
      }
    }
  };

  return (
    <div className="border-2 border-teal-300 rounded-xl my-4 px-2 py-8">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                margin: "10px",
                fontSize: "16px",
                border: "1px solid #D1A054",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-lg bg-[#17ACAC] text-center p-2 mt-4 w-full mx-auto text-white rounded-md"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600 text-xl my-4">{error}</p>
        {transactionId && (
          <p className="text-green-400 text-xl my-4">
            Payment successful. Payment Transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
