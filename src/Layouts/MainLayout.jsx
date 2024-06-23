import Home from "../Pages/Home/Home";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
           <div className="max-w-7xl mx-auto">
           <Navbar />
           <Home />
           </div>
            <Footer />
            
        </div>
    );
};

export default MainLayout;