import Home from "../Pages/Home/Home";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
            
        </div>
    );
};

export default MainLayout;