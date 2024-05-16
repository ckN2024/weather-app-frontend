import React from "react";
import { useState } from "react";
import axios from "axios";

const UploadProfilePicture = () => {
  const [file, setFile] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false)

  const submitHandler = async (e) => {
    setButtonLoading(true)
    e.preventDefault();
    // console.log("submitHandler is clicked");
    try {
      // console.log(file, typeof file)
      const formData = new FormData();
        formData.append('file', file);
  
      const response = await axios.post('http://localhost:5000/api/users/uploads', formData)
      setButtonLoading(false)
      
      // console.log(`File upload response: \n${response}`)
    } catch (error) {
      console.log("Error uploading file: \n", error.message)
    }
    
  };

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  return (
    <div className="flex items-center justify-center gap-3 min-h-screen px-[6em] py-2">
      <img
        src="/male_profile.svg"
        alt="male_profile_pic"
        className="w-[10em] aspect-square"
      />

      <div className="bg-blue-100 px-[3em] py-[1em]">
        <h1 className="text-[2.5em] font-medium">Upload Picture</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-2">
          <div>
            <div className="w-[10em] aspect-square flex justify-center items-center border border-blue-300 bg-gray-100">
              {file ? (
                <img
                src={imageURL}
                alt="chosen_image"
                className="object-cover"
              />
              ):(<p className="text-slate-600">No file chosen</p>)}
            </div>
            <label htmlFor="profilepic" className="block text-slate-600">
              Select a photo
            </label>
            <input
              id="profile_pic"
              type="file"
              name="file"
              className="block text-slate-600"
              onChange={fileChangeHandler}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 rounded-md p-2 text-white"
            disabled={buttonLoading}
          >
            {
              buttonLoading ? "loading" : "Upload"
            }
          </button>
        </form>
      </div>

      <img src="/female_profile.svg" alt="male_profile_pic" className="w-[10em] aspect-square" />
    </div>
  );
};

export default UploadProfilePicture;
