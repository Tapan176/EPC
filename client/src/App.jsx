import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/home/Home';
import Logout from './components/auth/Logout';
// import Chat from './components/chat/ChatHome';
import Dashboard from './components/dashboard/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/login" element= {<LoginForm/>}/>
        <Route path="/sign-up" element= {<SignupForm/>}/>
        <Route path="/logout" element= {<Home/>}/>
        <Route path="/forgot-password" element= {<ForgotPassword/>}/>
        <Route path="/reset-password" element= {<ResetPassword/>}/>
        {/* <Route path="/chat" element= {<Chat/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}


