
import { Link, useLocation } from "react-router-dom";


import CheckoutForm from "../Checkout/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const PaymentPage = ({ bookingData }) => {

  if (!bookingData) {
    return <div>
      <h1> No Booking Data Found</h1>
    </div>
  }
  console.log(bookingData);




  // console.log(bookingData);
  return (
    <div>

      <header className="bg-white dark:bg-gray-900">
        <nav className="px-6 py-4 shadow">
          <div className="lg:items-center lg:justify-between lg:flex">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
            </div>

            {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          </div>
        </nav>

        <div className="lg:flex">
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                Get
                <span className="text-blue-600 dark:text-blue-400">
                  Your desired service
                </span>
                After a small payment
              </h2>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                Here you can pay for your desired service and get it done by our professionals.
                So what are you waiting for? Pay now and get your service done.
              </p>

              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <Link
                  href="#"
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700"
                >
                  Pay Now
                </Link>
                <Link
                  to={"/"}
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
                >
                  No Thanks
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full h-64 lg:w-1/2 lg:h-auto">
            <div
              className="w-full h-full bg-cover"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80)",
              }}
            >
              <div className="w-full h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Payment</h4>
              </div>
              <Elements stripe={stripePromise}>
                <CheckoutForm bookingData={bookingData} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
