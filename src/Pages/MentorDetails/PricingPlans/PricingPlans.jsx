import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiCheck, FiX } from "react-icons/fi"; // Import the check icon
import CheckoutForm from "../../../../components/Checkout/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import Modal from "react-modal";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const plans = [
    {
        id: 1,
        name: "Basic",
        billingOptions: {
            monthly: { price: 59.99, frequency: "per month" },
            yearly: { price: 599.99, frequency: "per year" },
            biennial: { price: 1099.99, frequency: "every 2 years" },
        },
        features: [
            "Access all features",
            "5 watchlists included",
            "Chat support",
            "Optimize hashtags",
            "5 exclusive widgets",
        ],
    },
    {
        id: 2,
        name: "Pro",
        billingOptions: {
            monthly: { price: 89.99, frequency: "per month" },
            yearly: { price: 899.99, frequency: "per year" },
            biennial: { price: 1699.99, frequency: "every 2 years" },
        },
        features: [
            "Access all features",
            "Unlimited watchlists",
            "Chat support",
            "Optimize hashtags",
            "10 exclusive widgets",
            "Priority support",
        ],
    },
    {
        id: 3,
        name: "Premium",
        billingOptions: {
            monthly: { price: 120.99, frequency: "per month" },
            yearly: { price: 1199.99, frequency: "per year" },
            biennial: { price: 2199.99, frequency: "every 2 years" },
        },
        features: [
            "Access all features",
            "Unlimited watchlists",
            "Chat support",
            "Optimize hashtags",
            "15 exclusive widgets",
            "24/7 support",
            "Dedicated account manager",
        ],
    },
];

const PricingPlan = ({ plan, billingCycle, onSelect }) => {
    const { price, frequency } = plan.billingOptions[billingCycle];
    return (
        <div className="w-full px-6 py-4 transition-colors duration-300 transform rounded-lg bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
            <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{plan.name}</p>
                <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">${price}</h4>
                <p className="mt-2 text-gray-500 dark:text-gray-300">{frequency}</p>
            </div>
            <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <FiCheck className="w-5 h-5 text-green-500" />
                        <span className="ml-2">{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                onClick={() => onSelect(plan)} // Trigger modal opening with selected plan
            >
                Select For Booking
            </button>
        </div>
    );
};

const PricingPlans = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const slotId = searchParams.get("slotId");
    const mentorId = searchParams.get("mentorId");
    const mentorName = searchParams.get("mentorName");

    const [billingCycle, setBillingCycle] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (slotId && mentorId && mentorName) {
            console.log(`Booking slot for mentor ${mentorName} with Slot ID: ${slotId} and Mentor ID: ${mentorId}`);
        }
    }, [slotId, mentorId, mentorName]);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true); // Open modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null); // Reset selected plan after closing
    };
    const { user } = UseAuth();

    return (
        <div className="max-w-6xl mx-auto p-6 bg-slate-950">
            <h1 className="text-3xl font-semibold text-center text-white mb-8">Choose Your Plan</h1>

            <div className="flex justify-center mb-8">
                <div className="bg-gray-800 rounded-full p-2 flex">
                    <div
                        onClick={() => setBillingCycle("monthly")}
                        className={`cursor-pointer rounded-full px-6 py-2 transition duration-300 relative ${billingCycle === "monthly" ? "bg-blue-500 text-white border-2 border-blue-600" : "text-gray-300 hover:bg-blue-600 border-t-2 border-b-2 border-transparent"}`}
                    >
                        Monthly
                    </div>
                    <div
                        onClick={() => setBillingCycle("yearly")}
                        className={`cursor-pointer rounded-full px-6 py-2 transition duration-300 relative ${billingCycle === "yearly" ? "bg-blue-500 text-white border-2 border-blue-600" : "text-gray-300 hover:bg-blue-600 border-t-2 border-b-2 border-transparent"}`}
                    >
                        Yearly
                    </div>
                    <div
                        onClick={() => setBillingCycle("biennial")}
                        className={`cursor-pointer rounded-full px-6 py-2 transition duration-300 relative ${billingCycle === "biennial" ? "bg-blue-500 text-white border-2 border-blue-600" : "text-gray-300 hover:bg-blue-600 border-t-2 border-b-2 border-transparent"}`}
                    >
                        Biennial
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <PricingPlan key={plan.id} plan={plan} billingCycle={billingCycle} onSelect={handlePlanSelect} />
                ))}
            </div>

            {/* Modal for Checkout Form */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal-class">
                    <div className="flex items-center justify-center fixed inset-0 z-50">
                        <div className=" bg-white rounded-lg p-6 max-w-3xl w-full mx-auto my-auto max-h-60 overflow-auto shadow-lg relative">
                            {/* Close icon */}
                            <FiX
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl"
                            />

                            <h2 className="text-2xl font-semibold mb-4 text-gray-950">Complete Your Booking</h2>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    bookingData={{
                                        bootCampPrice: selectedPlan.billingOptions[billingCycle].price,
                                        user: user,
                                        bootCampName: selectedPlan.name,
                                        bootCampMentors: mentorName,
                                    }}
                                />
                            </Elements>
                        </div>
                    </div>
                    <div className="fixed inset-0 bg-black opacity-50"></div> {/* Background overlay */}
                </Modal>
            )}

        </div>
    );
};

export default PricingPlans;