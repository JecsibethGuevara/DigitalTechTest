import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './globals.css';
import { Home } from './_root/pages';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import UserProfile from './_root/pages/UserProfile';


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
          <Route element={<AuthLayout/>}>
            <Route path="/sign-in" element={<SigninForm/>}/>
            <Route path="/sign-up" element={<SignupForm/>}/>
          </Route>
          



        {/* private routes */}
        <Route element={<RootLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/user' element={<UserProfile/>}/>
        </Route>
        
      
      
      </Routes>
    </main>
  )
}

export default App