import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = ({ setEmail, setPassword }) => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false)

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setButtonLoading(true)
    try {
      await axios.post(
        "http://localhost:7000/api/users",
        formData
      );

      setEmail(formData.email)
      setPassword(formData.password)
      setButtonLoading(false)
      navigate("/verify")
    } catch (error) {
      console.log("Error in frontend signup")
      console.log(error)
    } finally {
      setButtonLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen px-[6em] py-2">
      <img src="/forms.svg" alt="form_image" className="max-h-[70vh]" />

      <div className="min-h-[70vh] w-[40%] bg-blue-100 px-[3em] py-[1em] rounded-md">
        <h1 className="text-[2.5em] font-medium">Sign Up</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <div>
            <label htmlFor="userName" className="block text-slate-600">
              Username
            </label>
            <input
              id="userName"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Enter your username"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-slate-600">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Enter your first name"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-slate-600">
              Last Name{" "}
              <span className="text-slate-500 text-[0.8em]">(optional)</span>
            </label>
            <input
              id="lastName"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Enter your last name"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-slate-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-slate-600">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
              placeholder="Enter your mobile number"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-slate-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <button 
            className="bg-blue-600 rounded-md p-2 text-white" 
            type="submit"
          >
            {
              buttonLoading ? "Loading..." : "Sign Up"
            }
          </button>
        </form>

        <div className='flex flex-col items-center'>
            <p className='text-slate-700'>or</p>
          <Link to="/signin" className='text-blue-500 underline'>Log in</Link>
          </div>
      </div>
    </div>
  );
};

export default SignUp;
