import axios from "axios";
import { toast } from "react-toastify";

export const setupAxiosInterceptors = (navigate, setToken, setQuantities) => {
  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 ||
        error.message?.includes("JWT expired") ||
        error.message?.includes("JWT Token has expired")
      ) {
        // Clear authentication data
        localStorage.removeItem("token");
        setToken(null);
        setQuantities({});
        toast.error("Your session has expired. Please login again.");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
