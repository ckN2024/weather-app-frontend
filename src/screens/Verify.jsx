import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cognitoSignIn from "../helpers/cognito/cognitoSignIn";

const Verify = ({ email, password }) => {
  const [verifyCode, setVerifyCode] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setButtonLoading(true)

    try {
      // verify the user
      await axios.post("http://localhost:7000/api/users/verify", {
        verifyCode,
        email,
      });

      // sign in the user automatically
      await cognitoSignIn(email, password)
      setButtonLoading(false)

      navigate("/");
    } catch (error) {
      console.log("error in code verification");
      console.log(error);
    } finally {
      setButtonLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 w-full min-h-screen px-[6em] py-2">
      <div className="w-[40%] bg-green-100 px-[3em] py-[1em] rounded-md">
        <h1 className="text-[2.5em] font-medium">Verify</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <div>
            <label htmlFor="verifyCode" className="block text-slate-600">
              Verification Code
            </label>
            <input
              id="verifyCode"
              type="text"
              onChange={(e) => setVerifyCode(e.target.value)}
              placeholder="Enter your email"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <button
            className="bg-blue-600 rounded-md p-2 text-white"
            type="submit"
          >
            {
              buttonLoading ? "Loading...":"Verify"  
            }
          </button>
        </form>
        <div className="flex flex-col items-center">
          <p className="text-slate-700">or</p>
          <p className="text-blue-500 underline hover:cursor-pointer">
            Resend verification code
          </p>
        </div>
      </div>

      <img src="/forms.svg" alt="form_image" className="max-h-[70vh]" />
    </div>
  );
};

export default Verify;
