import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth/UseAuth";
import { HashLoader } from "react-spinners";


const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
       
        <HashLoader />
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname || "/"} replace to="/login" />;
  }
};

export default PrivateRoute;



