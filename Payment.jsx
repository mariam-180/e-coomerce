import { useFormik } from "formik"
import { useContext, useState } from "react"
import * as Yup from 'yup'
import { CartContext } from "../Context/CartContext"
import axios from "axios"



const Payment = () => {

const [Details,setDetails]=useState("")
const [City,setCity]=useState("")
const [Phone,setPhone]=useState("")

const {CartId, setProducts,setNumOfItems,setTotalPrice}=useContext(CartContext)
const [Loading,setLoading]=useState(false)


console.log("the cart id is",CartId);

// async function cashOrder(){
//     setLoading(true)
// const x={
//     shippingAddress:{
//         details: Details,
//         phone: Phone,
//         city: City
//         }
// } 


// try {
    
// const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,x,{
//     headers:{
//         token : localStorage.getItem("tkn")
//     }

// })

// console.log(87089);

// setProducts([])
// setNumOfItems(0)
// setTotalPrice(0)
// setLoading(false)
// } catch (error) {
//     console.log(error,"error from cash order");
    
// }

// console.log(x);

// }





async function cashOrder(){
const x={
  shippingAddress:{
      details: Details,
      phone: Phone,
      city: City
      }
} 


try {
  
const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,x,{
  headers:{
      token : localStorage.getItem("tkn")
  },
  params:{
    url:"http://localhost:5173"
  }

})

window.open(data.session.url)

} catch (error) {
  console.log(error,"error from cash order");
  
}

console.log(x);

}





  return (
    <>
     <div className="py-10 mx-auto px-5 md:w/[60%]">
     <div className="py-10">
     {/* details input */}

<div className="mb-5 pt-10">
    <label htmlFor="details"  className="block mb-2  font-normal text-[15px] text-black"> details:</label>
    <input onChange={(e)=> setDetails(e.target.value)}  type="text" id="details" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
       {/* city input */}
<div className="mb-5">
    <label htmlFor="city"  className="block mb-2  font-normal text-[15px] text-black"> city:</label>
    <input onChange={(e)=> setCity(e.target.value)} type="text" id="city" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
  {/* phone input */}
  <div className="mb-5">
    <label htmlFor="phone"  className="block mb-2   font-normal text-[15px] text-black"> Phone:</label>
    <input onChange={(e)=> setPhone(e.target.value)} type="phone" id="phone" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
 

</div>
<button onClick={cashOrder}  className='w-full text-2xl   md:w-[23%] text-black border border-green-400  text-1xl rounded-lg py-3 px-5 '>
{Loading? <i className="fa-solid fa-spinner fa-spin hover:bg-green-500 text-black"></i> : "Pay now"}

</button >


{/* <button onClick={online}  className='w-full text-2xl   md:w-[23%] text-black border border-green-400  text-1xl rounded-lg py-3 px-5 '>
online payment
</button > */}
     </div>
    </>
  )
}

export default Payment
