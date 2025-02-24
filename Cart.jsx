import { useContext } from "react"
import chair from "./../../assets/Images/chair.jpg"
import { CartContext } from "../Context/CartContext"
import { Link } from "react-router-dom"

const Cart = () => {

    const { products, totalPrice, Loading, updateCount, removeItem, clearCart, numOfItems } = useContext(CartContext)

    if (Loading) {

        return <div className="flex justify-center items-center h-screen w-full bg-gray-200">
            <i className="fa-solid fa-spinner fa-spin-pulse text-[100px]"></i>
        </div>
    }
    console.log("Loading state in Cart:", Loading);
    console.log(products);
    //useeffect
    return (
        <>

            <div className='py-10 mx-auto md:w-[90%] mt-5 bg-slate-100 '>
                <div className='py-10'>
                    <div className="flex items-center  justify-between">
                        <h1 className='font-bold text-3xl mb-3 ms-5'>cart shop</h1>
                        <div className=" py-5 ">
                            <Link to={"/payment"}>
                                <button className='ms-auto text-2xl  me-2 text-black border border-green-400  text-1xl rounded-lg py-3 px-5 '>
                                    checkout
                                </button >
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center  justify-between">

                        <h3 className='ms-5 py-4 '>
                            <span className='font-semibold text-2xl text-black'>Total price :</span> <span className='text-green-600 font-semibold  text-[20px]'>{totalPrice}</span>
                        </h3>
                        <h3 className='ms-5 py-4 '>
                            <span className='font-semibold text-2xl  text-black'>Total price :</span> <span className='me-3 text-green-600 font-semibold  text-[20px]'>{numOfItems}</span>
                        </h3>
                    </div>

                </div>


                <div className="parent mt-3">

                    {/* this is the div that mapping will done on it */}

                    {products?.map(function (item, idx) {
                        return <div key={idx} className="flex flex-wrap justify-center items-center pb-3 border-b-[1px] border-slate-300">
                            {/* img */}

                            <div className=' sm:w-full md:w-1/6   p/4'>
                                <div>
                                    <img src={item.product.imageCover} className="w-full" alt="" />
                                </div>
                            </div>

                            {/* content */}

                            <div className="w-4/6 p-4 ms-4">

                                <h2 className="text-3xl font-bold">{item.product.title}</h2>
                                <h3 className="my-3 text-green-600"> {item.price} egp</h3>
                                <h2>{item.product._id}</h2>

                                <i className="fa-solid fa-trash text-red-600 me-3"></i>
                                <button onClick={() => removeItem(item.product._id)} className='  me-5 text-red-600 text-1xl rounded-md py-5 mx-auto'>
                                    remove                            </button >
                            </div>

                            {/* class */}
                            {/* counter */}

                            <div className='w-1/6 p/4 '>
                                <div className="flex md:flex-wrap justify-center items-center">

                                    <button onClick={() => updateCount(item.product._id, item.count + 1)} className=' text-green-600 border border-green-300 text-1xl rounded-md py-2 px-4 mx-0 '>
                                        +
                                    </button >
                                    <h3 className="mx-2">{item.count}</h3>
                                    <button onClick={() => updateCount(item.product._id, item.count - 1)} className='text-red-600 text-1xl border border-red-300 rounded-md py-2 px-4 mx-0 '>
                                        -
                                    </button >

                                </div>
                            </div>


                        </div>
                    })}

                </div>


                <div className="mx-auto py-5 text-center">
           <Link to={"/home"}>
           <button onClick={() => clearCart()} className=' text-2xl  w-1/3 md:w-[23%] text-black border border-green-400  text-1xl rounded-lg py-3 px-5 '>
           clear  your cart                          </button >
           </Link>  


                </div>
            </div>
        </>
    )
}

export default Cart
