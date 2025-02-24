import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishListContext";

const Home = () => {
  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
const {getUserWishList,addProductToWishlist}=useContext(WishlistContext)
 const[search, setSearch]=useState("")

console.log("the search is" ,search); 
async function productToCart(id) {
    const data = await addProductToCart(id);

    console.log(data);

    if (data.status === "success") {
      toast.success(data.message);
      setLoading(true);
    } else {
      toast.error("Adding failed");
      setLoading(false);
    }
  }

  async function getAllProduct() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data; // Ensure correct data return
  }

  const { isLoading, error, data,isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <i className="fa-solid fa-spinner fa-spin-pulse text-[100px]"></i>
      </div>
    );
  }





  return (
    <>
      <div className="md:w-[90%] mx-auto">
        <HomeSlider />
        <CategorySlider />
        <div className="py-10">
          <div className="py-5 w-1/2 mx-auto">
            <input
              type="text"
              placeholder="Search"
              onChange={(e)=> setSearch(e.target.value)}
              className="w-full mx-auto mt-10 py-2 border border-gray-400 rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center ">
          {data?.data.filter((item)=>{
            return search.toLocaleLowerCase()===""?item:item.title.split(" ").slice(0, 2).join(" ").toLocaleLowerCase().includes(search)
          }).map((product, idx) => (
            <div key={idx} className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 p-4 ">
              <Link to={`/productdetails/${product.id}`}>
                <div className="bg-slate-100 p-3">
                  <img src={product.imageCover} className="w-full" alt={product.title}/>
                  <h3 className="text-green-700 mt-3">{product.category.name} hello</h3>
                  <h3 className="mt-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="mt-3 flex flex-wrap justify-between items-center">
                    <div>
                      <h2>{product.price}$</h2>
                    </div>
                    <div>         
                                   {product.ratingsAverage}

                      <i className="fa-solid fa-star text-yellow-500 mx-1"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center items-center  bg-slate-100 p-3">
                <button
                  onClick={() => productToCart(product.id)}
                  className="border w-full bg-green-500 me-5 text-white text-1xl rounded-md px-5 py-2 mx-auto"
                >
                  + Add
                </button>
                <div>
                <i
                  onClick={() => addProductToWishlist(product._id)}
                  className="fa-solid fa-heart text-green-950 text-2xl cursor-pointer"></i>    
                              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
