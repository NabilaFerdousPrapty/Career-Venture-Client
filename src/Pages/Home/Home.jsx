import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import Faq from "./FAQ/Faq";
import Features from "./Features/Features";
import Newsletter from "./Newsletters/Newsletter";
import Testimonial from "./Testimonials/Testimonal";


const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Banner />
            <Features />
            <Faq></Faq>
            <Newsletter />
            <Testimonial />

        </div>
    );
};

export default Home;