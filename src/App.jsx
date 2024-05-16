import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Verify from "./screens/Verify";
import { useEffect, useState } from "react";
import UploadProfilePicture from "./screens/UploadProfilePicture";
import Profile from "./screens/Profile";

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentCity, setCurrentCity] = useState('delhi')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home email={email} currentCity={currentCity} setCurrentCity={setCurrentCity}/>} />
        <Route path="/signup" element={<SignUp setEmail={setEmail} setPassword={setPassword}/>} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/verify" element={<Verify email={email} password={password}/>}/>
        <Route path="/upload" element={<UploadProfilePicture />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
