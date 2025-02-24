import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useState } from "react";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Reset Code is required"),
  });

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: handleVerifyCode,
  });

  async function handleVerifyCode(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: values.resetCode }
      );

      toast.success("Code verified successfully!");
      console.log("successful:", response.data);

      navigate("/ResetPassword", { state: { resetCode: values.resetCode } });
    } catch (error) {
      console.error(" Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Invalid reset ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-black font-medium text-3xl my-3">Verify Code</h1>

          {/* Reset Code Input */}
          <div className="mb-5">
            <label htmlFor="resetCode" className="block mb-2 font-normal text-[15px] text-black">
              Verification Code:
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              id="resetCode"
              className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Error!</span> {formik.errors.resetCode}
            </div>
          )}

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="border border-gray-500 text-gray-400 text-2xl rounded-md px-5 py-2"
              disabled={isLoading}
            >
              {isLoading ? <i className="fa-solid fa-spin fa-spinner text-black"></i> : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
