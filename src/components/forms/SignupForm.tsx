"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import FormImage from "@/assets/Overview.png";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/sign-up", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/sign-in");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen text-white">
      <div className="hidden lg:flex w-2/3 items-center justify-center bg-black">
        <Image
          src={FormImage}
          alt="Form Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-black p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-6">
            <Image src={logo} alt="Logo" className="h-12 w-12 mr-2" />
            <span className="text-2xl font-bold">GoAskPDF</span>
          </div>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-medium">
                Email or phone number
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
            {/* <div className="flex items-center justify-center mt-4">
              <span className="text-sm text-gray-600">
                Or sign in with Google
              </span>
            </div> */}
            {/* <div>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
              >
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
            </div> */}
            <div className="flex items-center justify-center mt-4">
              <span className="text-sm text-gray-600">
                Already have an account?
              </span>
              <a
                href="/sign-in"
                className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in now
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;