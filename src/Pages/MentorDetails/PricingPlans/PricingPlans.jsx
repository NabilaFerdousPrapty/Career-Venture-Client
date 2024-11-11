import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiCheck } from "react-icons/fi"; // Import the check icon

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

            <button className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                Select Plan
            </button>
        </div>
    );
};

const PricingPlans = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const slotId = searchParams.get('slotId');
    const mentorId = searchParams.get('mentorId');
    const mentorName = searchParams.get('mentorName');

    const [billingCycle, setBillingCycle] = useState('monthly');

    useEffect(() => {
        if (slotId && mentorId && mentorName) {
            console.log(`Booking slot for mentor ${mentorName} with Slot ID: ${slotId} and Mentor ID: ${mentorId}`);
        }
    }, [slotId, mentorId, mentorName]);
    console.log("booking slot for mentor", mentorName, "with slot id", slotId, "and mentor id", mentorId);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-slate-950">
            <h1 className="text-3xl font-semibold text-center text-white mb-8">Choose Your Plan</h1>

            {/* Billing Cycle Selector */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-800 rounded-full p-2 flex">
                    <div
                        onClick={() => setBillingCycle('monthly')}
                        className={`cursor-pointer rounded-full px-6 py-2 transition duration-300 relative ${billingCycle === 'monthly' ? 'bg-blue-500 text-white border-2 border-blue-600' : 'text-gray-300 hover:bg-blue-600 border-t-2 border-b-2 border-transparent'}`}
                    >
                        Monthly
                        {billingCycle === 'monthly' && <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 rounded-full opacity-30" />}
                    </div>
                    <div
                        onClick={() => setBillingCycle('yearly')}
                        className={`cursor-pointer rounded-full px-6 py-2 transition duration-300 relative ${billingCycle === 'yearly' ? 'bg-blue-500 text-white border-2 border-blue-600' : 'text-gray-300 hover:bg-blue-600 border-t-2 border-b-2 border-transparent'}`}
                    >
                        Yearly
                        {billingCycle === 'yearly' && <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 rounded-full opacity-30" />}
                    </div>
                    <div
                        onClick={() => setBillingCycle('biennial')}
                        className={`cursor-pointer rounded-full px-6 py-2 transition duration-300 relative ${billingCycle === 'biennial' ? 'bg-blue-500 text-white border-2 border-blue-600' : 'text-gray-300 hover:bg-blue-600 border-t-2 border-b-2 border-transparent'}`}
                    >
                        Biennial
                        {billingCycle === 'biennial' && <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 rounded-full opacity-30" />}
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <PricingPlan key={plan.id} plan={plan} billingCycle={billingCycle} />
                ))}
            </div>
        </div>
    );
};

export default PricingPlans;
