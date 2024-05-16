import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useState } from 'react';

const SearchBar = ({currentCity, setCurrentCity}) => {
  const [search, setSearch] = useState("")
  return (
    <div className='flex'>
        <input 
            type="search" 
            placeholder='Type city'
            onChange={(e)=> setSearch(e.target.value)}
            className="p-2 rounded-tl-lg rounded-bl-lg border border-slate-300 focus:border-slate-500 focus:outline-none"
        />
        <button onClick={()=> setCurrentCity(search)} className="bg-blue-500 hover:bg-blue-600 p-[0.2em] rounded-tr-lg rounded-br-lg">
            <FiSearch className="text-[1.7em] text-white" />
        </button>
    </div>
  )
}

export default SearchBar