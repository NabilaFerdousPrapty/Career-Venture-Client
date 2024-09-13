import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import Newsletter from "./Newsletters/Newsletter";
import Testimonial from "./Testimonials/Testimonal";


const Home = () => {
    return (
        <div className="overflow-x-hidden">
           <Banner/>
           <AboutUs/>
           <Features/>
           <Newsletter/>
           <Testimonial/>
        </div>
    );
};

export default Home;