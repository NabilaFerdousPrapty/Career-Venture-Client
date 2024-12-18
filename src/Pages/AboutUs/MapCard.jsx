import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const MapCard = () => {
    return (
        <section className="bg-accent rounded-2xl">
            <div className="container px-6 py-12 mx-auto">
                <div>
                    <p className="font-medium text-blue-500 dark:text-blue-400">Contact Us</p>

                    <h1 className="mt-2 text-2xl font-semibold  md:text-3xl text-primary">
                        Get in Touch
                    </h1>

                    <p className="mt-3 text-primary">
                        Our friendly team at Career Venture would love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <FaEnvelope className="w-5 h-5" />
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Our friendly team is here to help with any inquiries.
                            </p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                contact@careerventure.com
                            </p>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <FaMapMarkerAlt className="w-5 h-5" />
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Office</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Visit us at our headquarters for in-person queries.
                            </p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                123 Career Lane, Tech City, 45678, USA
                            </p>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <FaPhoneAlt className="w-5 h-5" />
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Phone</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Reach us by phone for immediate assistance.
                            </p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="map"
                            marginHeight="0"
                            marginWidth="0"
                            scrolling="no"
                            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=New%20York%2C%20USA&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapCard;
