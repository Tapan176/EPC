import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import Logout from './components/auth/Logout';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/home/Home';



export default function App() {
  return (
<BrowserRouter>
<Routes>
        <Route path="/" element = {<Home/>}/>
        <Route  path="/login" element= {<LoginForm/>}/>
        {/* <Route  path="/logout" element= />
        <Route  path="/forgotpassword" element= />
        <Route  path="/resetpassword" element= /> */} */}
        </Routes>
  </BrowserRouter>
  );
}


