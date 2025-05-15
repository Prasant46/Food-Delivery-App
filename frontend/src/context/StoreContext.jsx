import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import { toast } from "react-toastify";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
} from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const increaseQty = async (foodId) => {
    try {
      setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
      await addToCart(foodId, token);
    } catch (error) {
      setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) - 1 }));
      toast.error("Error adding to cart");
    }
  };

  const decreaseQty = async (foodId) => {
    try {
      setQuantities((prev) => ({
        ...prev,
        [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
      }));
      await removeQtyFromCart(foodId, token);
    } catch (error) {
      setQuantities((prev) => ({
        ...prev,
        [foodId]: prev[foodId] + 1,
      }));
      toast.error("Error removing from cart");
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      setQuantities((prevQuantities) => {
        const updatedQuantitites = { ...prevQuantities };
        delete updatedQuantitites[foodId];
        return updatedQuantitites;
      });
      await removeQtyFromCart(foodId, token);
    } catch (error) {
      toast.error("Error removing from cart");
    }
  };

  const loadCartData = async (token) => {
    try {
      const items = await getCartData(token);
      setQuantities(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
        if (token) {
          await loadCartData(token);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setToken(null);
          setQuantities({});
        }
      }
    }
    loadData();
  }, [token]);

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
