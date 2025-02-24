
import { useFormik } from 'formik'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
const Login = () => {

  const { setToken } = useContext(AuthContext);
const navigate=useNavigate()
  const[isloading, setIsLoading]=useState(false)
  const validYup = Yup.object().shape({
  
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  
    password: Yup.string()
      .required("Password is required")
      // Relaxed: no need to match uppercase or numbers, just minimum length
      .min(6, "Password must be at least 6 characters"),
  
  })

const user={
email:"",
password:"",
}
// *****************************************2***************************************************

const formik=useFormik({
initialValues:user,
onSubmit:logIn,
validationSchema:validYup,
})


// *****************************************3***************************************************

async function logIn(values){
  setIsLoading(true)
 try {
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
  localStorage.setItem("tkn", data.token)
    setToken(data.token)

    console.log(data);
  console.log(values);
 toast.success("success")
 setIsLoading(false)
 navigate("/home")

   } catch (e) {
     console.log(e.response.data.message);
     toast.error("error")
   }
   setIsLoading(false)

}
  return (
    <>
     {/* *****************************************1*************************************************** */}


    <div className=' min-h-screen flex items-center '>
        <div className="container mx-auto ">
        {/* // *****************************************4*************************************************** */}

        <form  onSubmit={formik.handleSubmit}>
      <h1 className='text-black font-medium text-3xl my-3'>
     Login now
    </h1>

  {/* email input */}
<div className="mb-5">
    <label htmlFor="email"  className="block mb-2  font-normal text-[15px] text-black"> Email:</label>
    <input type="email" onChange={formik.handleChange} value={formik.values.email} id="email" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
  {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
    <span className="font-medium">error!</span> {formik.errors.email}</div> : ""}
  {/* password input */}
  <div className="mb-5">
    <label htmlFor="password"  className="block mb-2   font-normal text-[15px] text-black"> Password:</label>
    <input type="password"  onChange={formik.handleChange} value={formik.values.password} id="password" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
  </div>
  {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">error!</span> {formik.errors.password}</div> : ""}
            

  <div className='w-full ms-auto flex justify-between'>
    <div>
  <Link to="/ForgotPassword" className='text-black text-2xl font-medium'>Forget password?</Link>
    </div>
  <button type='submit' className='border  border-gray-500 text-gray-400 text-2xl rounded-md px-5 py-2 mx-auto'>
  {isloading?<i className="fa-solid fa-spin fa-spinner text-black"></i> : "login"}

</button>
  </div>

    </form>
      </div>
    </div>

    </>
  )
}

export default Login
