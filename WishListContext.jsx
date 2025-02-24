import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  // Fetch user wishlist
  async function getUserWishList() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }

  // Add product to wishlist
  async function addProductToWishlist(productId) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      toast.success("added to wishlist")
      getUserWishList() // Update wishlist state
      return data;
    } catch (error) {
        toast.error("error to wishlist")

      console.error("Error adding product to wishlist:", error);
    } finally {
      setLoading(false);
    }
  }

  // Remove product from wishlist
  async function removeFromWishlist(productId) {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
  
      // Update wishlist with new data from API
      getUserWishList() 
  
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    } finally {
      setLoading(false);
    }
  }
  
  



  // Fetch wishlist on component mount
  useEffect(() => {
    if (token !== null) {
      getUserWishList();
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        getUserWishList,
        addProductToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
