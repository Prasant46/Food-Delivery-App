import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (data) => {
    try {
        const response = await axios.post(
            `${API_URL}/register`,
            data
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export const logout = (setToken, setQuantities, navigate) => {
    localStorage.removeItem('token');
    setToken(null);
    setQuantities({});
    navigate('/login');
};