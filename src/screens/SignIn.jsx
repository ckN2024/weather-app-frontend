import React from 'react'
import { useState } from 'react'
import cognitoSignIn from "../helpers/cognito/cognitoSignIn"
import axios from 'axios'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [buttonLoading, setButtonLoading] = useState(false)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setButtonLoading(true)

    try {
      const authTokens = await cognitoSignIn(formData.email, formData.password);
      setButtonLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center gap-3 w-full min-h-screen px-[6em] py-2">
      <div className="w-[40%] bg-blue-100 px-[3em] py-[1em] rounded-md">
        <h1 className="text-[2.5em] font-medium">Log In</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
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
            disabled={buttonLoading}
          >
            {
              buttonLoading ? "Loading..." : "Log In"
            }
          </button>
        </form>
        <div className='flex flex-col items-center'>
            <p className='text-slate-700'>or</p>
          <Link to="/signup" className='text-blue-500 underline'>Create Account</Link>
          </div>
      </div>

      <img src="/forms.svg" alt="form_image" className="max-h-[70vh]" />
    </div>
  )
}

export default SignIn