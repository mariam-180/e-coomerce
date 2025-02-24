import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import Login from "../Login/Login"

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [numOfItems, setNumOfItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [Loading, setLoading] = useState(false)
const [CartId,setCartId]=useState(null)
 const {token}= useContext(AuthContext)

  async function addProductToCart(id) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
  
     getUserCart()
      return data;
    } catch (error) {
      console.error("Error in addProductToCart:", error);
    } finally {
      setLoading(false); 
    }
  }
  

  async function getUserCart() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers:{
            token: localStorage.getItem("tkn"),
          },
        }
      );
  console.log(data);
  console.log("Cart Data:jj", data);


      setProducts(data.data.products);
      setNumOfItems(data.numOfCartItems);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data?.data?._id)
    } catch (error) {
      console.error("Error in getUserCart:", error);
    } finally {
      setLoading(false); // ✅ This ensures loading stops no matter what
    }
  }
    useEffect(() => {
  if(token !==null){
      getUserCart()
  }

  
  }, [token])

//update count

async function updateCount(id, count) {
  try {
    const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        
          count: count
      
      },
      {
        headers:{
token:localStorage.getItem("tkn")
        } 
    }
    )
    setProducts(data.data.products);
    setNumOfItems(data.numOfCartItems);
    setTotalPrice(data.data.totalCartPrice);
    console.log(data);
    
  } catch (error) {
    console.log(error, "error updatecount in context");
    
  }
}

//remove item

async function removeItem(id){
  try {
    
const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  {
    headers:{
      token : localStorage.getItem("tkn")
    },
  }

  
)

console.log(data);
setProducts(data.data.products);
setNumOfItems(data.numOfCartItems);
setTotalPrice(data.data.totalCartPrice);

  } catch (error) {
    console.log(error,"from remove item cart context");
    
  }
}

//clear cart

async function clearCart(){

  try {
    
const {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
  {
    headers:{
      token : localStorage.getItem("tkn")
    }
  }
)
setProducts([]);
setNumOfItems(0);
setTotalPrice(0);
  } catch (error) {
    console.log(error, "error from clear cart context");
    
  }
}

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        products,
        numOfItems,
        totalPrice,
        Loading,
        updateCount,
        removeItem,
        clearCart,
        CartId,
        setTotalPrice,
        setNumOfItems,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
