import { data, useParams } from "react-router-dom"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";


const ProductDetails = () => {

    const { id } = useParams()

    

    console.log("the id is" + id);
    const { addProductToCart } = useContext(CartContext)
const [loading, setLoading] = useState(false)

    async function detailsToCart() {
        const data = await addProductToCart(id)

        console.log(data);

        if (data.status == "success") {
            toast.success(data.message)
            
            setLoading(true)
        }
        else {
        toast.error("adding faild")
        setLoading(false)
        }

    }










const { isLoading, data, error } = useQuery({
    queryKey: ["productDetails", id],  // ✅ Now it's an array
    queryFn: getProductDetails,
});



async function getProductDetails() {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return response.data.data; // ✅ Extract only the product data
}
if (isLoading) {

    return (<div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <i class="fa-solid fa-spinner fa-spin-pulse text-[100px]"></i>
    </div>)
}

return (

    <>

        <div className='md:w-[80%] py-10  mx-auto'>
            <div className="flex flex-wrap justify-center py-10 items-center">
                <div className='md:w-1/3 p-5'>
                    <div>
                        <img src={data?.imageCover} className="w-full rounded-lg shadow-md" alt={data?.title} />
                    </div>

                </div>

                <div className="md:w-2/3 p-5">
                    <div>
                        <h1 className="text-3xl font-bold mb-3">{data?.title}</h1>
                        <p className="mb-3"> {data?.description} </p>
                        <h3 className="mb-3">{data?.category.name}</h3>
                        <div className="mt-3 flex flex-wrap justify-between items-center">
                            <div>
                                <h2>{data?.price}$</h2>
                            </div>
                            <div>
                                <i className="fa-solid fa-star mb-5 text-yellow-500 mx-1"></i>
                                {data?.ratingsAverage}
                            </div>


                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={detailsToCart} className='border w-full bg-green-500 me-5 text-white text-1xl rounded-md px-5 py-2 mx-auto'>
                            {loading? <i className="fa-solid fa-spinner fa-spin-pulse text-white"></i>:"+ add"}    
                            </button >
                            <div>
                                <i className="fa-solid fa-heart text-green-950 text-3xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
)
}

export default ProductDetails
