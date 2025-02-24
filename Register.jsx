
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
//1-do the design 
//2-use formik
//3-yup(validation)
//4-api
//5-toast
//6-

const navigate=useNavigate()
   const user = {
     name: "",
     email:"",
     password:"",
     rePassword:"",
     phone:""
   }

   const[isloading,setIsLoading]=useState(false)

   //shape makes u shape the regex u want
const validYup=Yup.object().shape({
  name: Yup.string().required("name is required").min(3,"min charcters are 3").max(15,"max charcters are 15"),
  email: Yup.string().required("name is required").email(),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),

rePassword: Yup.string()
  .required("Re-password is required").oneOf([Yup.ref("password")], "Passwords must match"),

phone: Yup.string()
  .required("Phone is required").matches(/^[0-9]+$/, "Please enter a valid phone number with only digits"),
})

 async function register(values){
  setIsLoading(true)
try {
  const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
  

  console.log(666);
  console.log(values);
  console.log(data);
  toast.success('Successfull')
  setIsLoading(false)
  navigate("/")
} catch (e) {
 console.log(e.response.data.message);
 toast.error("error")
 setIsLoading(false)
}



}


  const formik = useFormik({
    initialValues:user,
onSubmit:register,
validationSchema:validYup,
  })


  return (
    <>

    <div className=' min-h-screen flex items-center '>
        <div className="container mx-auto ">
           
        <form onSubmit={formik.handleSubmit}>
      <h1 className='text-black font-medium text-3xl my-3'>
     Register now
    </h1>
{/* name input */}
<div className="mb-5">
    <label htmlFor="name"  className="block mb-2  font-normal text-[15px] text-black"> Name:</label>
    <input onChange={formik.handleChange} value={formik.values.name} type="name" id="name" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
{formik.errors.name && formik.touched.name? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <span class="font-medium">Danger alert!</span>{ formik.errors.name}
</div>:""}
  {/* email input */}
<div className="mb-5">
    <label htmlFor="email" className="block mb-2   font-normal text-[15px] text-black"> Email:</label>
    <input onChange={formik.handleChange} value={formik.values.email} type="email" id="email" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
  {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
    <span className="font-medium">error!</span> {formik.errors.email}</div> : ""}
  {/* password input */}
  <div className="mb-5">
    <label htmlFor="password"  className="block mb-2   font-normal text-[15px] text-black"> Password:</label>
    <input onChange={formik.handleChange} value={formik.values.password} type="password" id="password" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
  {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
    <span className="font-medium">error!</span> {formik.errors.password}</div> : ""}
   {/* Re-password input */}
<div className="mb-5">
  <label htmlFor="rePassword" className="block mb-2 font-normal text-[15px] text-black">
    Re-password:
  </label>
  <input onChange={formik.handleChange} value={formik.values.rePassword} type="password"id="rePassword" name="rePassword" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
</div> 
{formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <span className="font-medium">error!</span> {formik.errors.rePassword}</div> : ""}

  {/* phone input */}
  <div className="mb-5">
    <label htmlFor="phone"  className="block mb-2   font-normal text-[15px] text-black"> Phone:</label>
    <input onChange={formik.handleChange} value={formik.values.phone} type="phone" id="phone" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
  {formik.errors.email && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">error!</span> {formik.errors.phone}</div> : ""}
  <div className='w-full ms-auto'>
  <button type='submit' className='border border-gray-500 text-gray-400 text-2xl rounded-md px-5 py-2 mx-auto'>
    {isloading? <i className='fa-solid da-spin fa-spinner text-black'></i> : "  Register now"}

</button>
  </div>

    </form>
      </div>
    </div>
    </>
  )
}

export default Register
