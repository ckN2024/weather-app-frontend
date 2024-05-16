import React from 'react'
import { MdHome } from "react-icons/md";
import { IoMdLogIn, IoMdLock, IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cognitoSignOut from '../helpers/cognito/cognitoSignOut';
import { CgProfile } from "react-icons/cg";

const Navbar = ({email}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    cognitoSignOut(email)
    setIsLoggedIn(false)
  }

  useEffect(()=>{
    const accessToken = sessionStorage.getItem("accessToken");
    if(accessToken) {
      setIsLoggedIn(true)
    }
  },[isLoggedIn])

  return (
    <div className="flex gap-[1.2em] p-2">
        {/* Home */}
        <Link to="/"  className='flex gap-1 items-center'>
            <MdHome className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Home</p>
        </Link>

        {
          isLoggedIn ? (
            // Profile
            <Link to="/profile" className='flex gap-1 items-center'>
              <CgProfile className="text-[1.5em]"/>
              <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Profile</p>
            </Link>
          ):(
            ""
          )
        }

        {
          isLoggedIn ? (
            //  Log out
            <button onClick={logoutHandler} to="/" className='flex gap-1 items-center'>
              <IoMdLogOut className="text-[1.5em]"/>
              <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Log out</p>
            </button>
          ):(
            //  Login 
            <Link to="/signin" className='flex gap-1 items-center'>
              <IoMdLogIn className="text-[1.5em]"/>
              <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Login</p>
            </Link>
          )
        }
        
        {
          isLoggedIn? (
            ""
          ):(
            // Signup
            <Link to="/signup" className='flex gap-1 items-center'>
              <IoMdLock className="text-[1.5em]"/>
              <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Signup</p>
            </Link>
          )
        }

        {

        }

        
        
    </div>
  )
}

export default Navbar