import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FiCheck } from "react-icons/fi"; // Import the check icon
import "./index.css"; // Include Tailwind or additional styles here

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

const PricingPlan = ({ plan, billingCycle }) => {
    const { price, frequency } = plan.billingOptions[billingCycle];
    return (
        <div className="w-full px-6 py-4 transition-colors duration-300 transform rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{plan.name}</p>
                <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">${price}</h4>
                <p className="mt-2 text-gray-500 dark:text-gray-300">{frequency}</p>
            </div>

            <div className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                        <FiCheck className="w-5 h-5 text-blue-500" /> {/* React Icon used here */}
                        <span className="mx-4 text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>

            <button className="w-full px-4 py-2 mt-6 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Choose {plan.name}
            </button>
        </div>
    );
};

const PricingPlans = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto">
                <div className="flex justify-center mb-8 space-x-4">
                    <button
                        onClick={() => setBillingCycle("monthly")}
                        className={`px-4 py-2 rounded-md ${billingCycle === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle("yearly")}
                        className={`px-4 py-2 rounded-md ${billingCycle === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Yearly
                    </button>
                    <button
                        onClick={() => setBillingCycle("biennial")}
                        className={`px-4 py-2 rounded-md ${billingCycle === "biennial" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Biennial
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center space-y-6 md:items-end md:-mx-5 md:space-y-0 md:flex-row">
                    {plans.map((plan) => (
                        <div key={plan.id} className="md:mx-5 md:w-96">
                            <PricingPlan plan={plan} billingCycle={billingCycle} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;

