import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../src/hooks/UseAxiosSecure/UseAxiosSecure";

const CheckoutMentorForm = ({ bookingData, onBookingSuccess }) => {
    const { bootCampPrice, user, bootCampName, bootCampMentors, slotId, mentorId, date } = bookingData;

    console.log('Booking Data:', bootCampPrice);  // Check if this is the correct price

    const stripe = useStripe();
    const elements = useElements();
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                if (bootCampPrice > 0) {
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

    const bookSlot = async () => {
        try {
            // First check if the slot is available before proceeding with the payment
            const response = await axiosSecure.post(`/mentor/slot/book/${mentorId}`, {
                user,
                slotId,
                date,

            });

            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "Slot Booked Successfully",
                    text: `Your slot with ${bootCampMentors} has been booked.`,
                });
                return true;
            }

            // Slot already booked
            if (response.status === 409) {
                Swal.fire({
                    icon: "error",
                    title: "Slot is already booked",
                    text: "Please choose a different time or slot.",
                });
                return false;
            }

            // Other errors
            Swal.fire({
                icon: "error",
                title: "Failed to Book Slot",
                text: "There was an error booking the slot. Please try again.",
            });
            return false;

        } catch (error) {
            console.error("Error booking slot:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to Book Slot",
                text: "There was an error booking the slot. Please try again.",
            });
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            setError("Stripe has not been initialized or client secret is missing.");
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            setError("Please enter your card information.");
            return;
        }

        const { error: methodError } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (methodError) {
            setError(methodError.message);
            return;
        } else {
            setError("");
        }

        // First, book the slot before proceeding with payment
        const slotBooked = await bookSlot();
        if (!slotBooked) {
            return; // Stop if the slot booking failed
        }

        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "Anonymous",
                    email: user?.email || "anonymous@example.com",


                },
            },
        });

        if (paymentError) {
            setError(paymentError.message);
            return;
        } else {
            setError("");
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email || "anonymous@example.com",
                    price: bootCampPrice,
                    planName: bootCampName,
                    mentorId,
                    slotId,
                    MentorName: bootCampMentors,
                    date: new Date().toLocaleDateString(),
                    status: "pending",
                    transactionId: paymentIntent.id,
                };

                try {
                    const res = await axiosSecure.post("/payments", payment);
                    if (res.data) {
                        onBookingSuccess && onBookingSuccess(); // Trigger success callback if booking is successful
                        setTransactionId("");
                        setError("");
                    }
                } catch (error) {
                    console.error("Error saving payment info:", error);
                    setError("Payment succeeded, but there was an error saving the payment info.");
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

export default CheckoutMentorForm;
