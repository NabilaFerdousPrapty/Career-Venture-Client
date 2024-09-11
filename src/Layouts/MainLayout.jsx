import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useEffect, useState } from "react";
import { CircleLoader,} from "react-spinners";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  // console.log(loading);
 useEffect(() => {
   const timer = setTimeout(() => {
     setLoading(false);
   }, 1000); 

   return () => clearTimeout(timer);
 }, []);
    

  return (
    <div>
      {loading ? (
        <div className="h-screen  flex justify-center items-center">
        <CircleLoader className="text-5xl"  color={"#d19945"} loading={loading} size={150} />
        </div>
        
      ) :(
        <div>
          
      <div className="max-w-7xl mx-auto my-3">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
      </div>
      )}
    
    </div>

  );
};

export default MainLayout;
