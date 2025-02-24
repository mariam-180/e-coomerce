import { useContext, useState } from "react";
import { WishlistContext } from "../Context/WishListContext";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist, } =
    useContext(WishlistContext);
    const { addProductToCart } = useContext(CartContext);
    const [isLoading ,setisLoading] = useState(false);
  
    async function productToCart(id) {
      const data = await addProductToCart(id);
  
      if (data.status === "success") {
        toast.success(data.message);
        removeFromWishlist(id);
        setisLoading(true);
        
      } else {
        toast.error("Adding failed");
        setisLoading(false);
      }
    }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <i className="fa-solid fa-spinner fa-spin-pulse text-[100px]"></i>
      </div>
    );
  }

  return (
    <>
      <div className="py-10 mx-auto md:w-[90%] mt-5 bg-slate-100">
        <div className="py-10">
          <h1 className="font-bold text-3xl mb-3 ms-5">Wishlist</h1>
          <div className="flex items-center justify-between">
            <h3 className="ms-5 py-4">
              <span className="font-semibold text-2xl text-black">
                Total Items :
              </span>{" "}
              <span className="text-green-600 font-semibold text-[20px]">
                {wishlist.length}
              </span>
            </h3>
          </div>
        </div>


        <div className="parent mt-3">
          {/* Mapping Wishlist Items */}
          {wishlist.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap justify-center items-center pb-3 border-b-[1px] border-slate-300"
            >
              {/* Product Image */}
              <div className="sm:w-full md:w-1/6 p/4">
                <img
                  src={item.imageCover}
                  className="w-full"
                  alt={item.title}
                />
              </div>

              {/* Product Details */}
              <div className="w-4/6 p-4 ms-4">
                <h2 className="text-3xl font-bold">{item.title}</h2>
                <h3 className="my-3 text-green-600">Price: {item.price} EGP</h3>

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-600 text-1xl rounded-md py-5 mx-auto"
                >
                  <i className="fa-solid fa-trash text-red-600 me-3"></i>
                  Remove
                </button>
              </div>
              <div>
                         <button onClick={ ()=>  productToCart(item._id)} className='    text-[20px] text-black border border-green-400  text-1xl rounded-lg py-3 px-4 '>
                add  your cart                          </button >     
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
