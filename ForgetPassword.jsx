import { useFormik } from "formik";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Validation Schema
  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  // ✅ Formik Configuration
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleForgotPassword,
    validationSchema: validYup,
  });

  // ✅ Handle Forgot Password API
  async function handleForgotPassword(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
         values,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Check your email for a reset code!");
      console.log("✅ API Response:", response.data); // Debugging

      navigate("/VerifyCode", { state: { email: values.email } }); // ✅ Navigate to VerifyCode
    } catch (error) {
      console.error("❌ API Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-black font-medium text-3xl my-3">
              Forgot Password
            </h1>

            {/* Email Input */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 font-normal text-[15px] text-black"
              >
                Email:
              </label>
              <input
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">Error!</span>{" "}
                {formik.errors.email}
              </div>
            )}

            {/* Submit Button */}
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="border border-gray-500 text-gray-400 text-2xl rounded-md px-5 py-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spin fa-spinner text-black"></i>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
