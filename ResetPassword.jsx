import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: { newPassword: "" },
    validationSchema,
    onSubmit: handleSetNewPassword,
  });

  async function handleSetNewPassword(values) {
    setIsLoading(true);
    try {
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        resetCode, 
        newPassword: values.newPassword,
      });

      toast.success("Password reset successful");
      navigate("/");
    } catch (error) {
      console.error(" Error from handle set password:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to reset ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-black font-medium text-3xl my-3">Set New Password</h1>

          {/* Password Input */}
          <div className="mb-5">
            <label htmlFor="newPassword" className="block mb-2 font-normal text-[15px] text-black">
              New Password:
            </label>
            <input
              type="password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              id="newPassword"
              className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <button type="submit" className="border border-gray-500 text-gray-400 text-2xl rounded-md px-5 py-2" disabled={isLoading}>
              {isLoading ? <i className="fa-solid fa-spin fa-spinner text-black"></i> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
