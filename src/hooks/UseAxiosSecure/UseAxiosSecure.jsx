
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

});
const UseAxiosSecure = () => {
    const navigate = useNavigate();
    const { LogOut } = UseAuth();

    useEffect(() => {
        axiosSecure.interceptors.request.use(function (config) {
            // Do something before request is sent
            const token = localStorage.getItem('access-token');
            if (token) {

                // console.log('Request sent',token);
                config.headers.Authorization = `Bearer ${ token }`;
                return config;
            }
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        //for 401 and 403 error
        axiosSecure.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, async (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const errorStatus = error?.response?.status;
            if (errorStatus === 401 || errorStatus === 403) {
                localStorage.removeItem('access-token');
                await LogOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });
    }, [navigate, LogOut])

    return axiosSecure;
};

export default UseAxiosSecure;
