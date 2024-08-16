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
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response: any = await axios.post("/api/sign-in", {
        email,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("Uid", response.data.Uid);
        dispatch(
          login({
            email: response.data.email,
            Uid: response.data.Uid,
            token: response.data.token,
          })
        );
        router.push("/");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen text-black">
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
          {/* <h3 className="text-lg text-center mb-6">Nice to meet you</h3> */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Email or phone number
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <label htmlFor="remember-me" className="ml-2 block text-sm ">
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
                onClick={handleLogin}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
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
                Don't have an account?
              </span>
              <a
                href="/sign-up"
                className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
