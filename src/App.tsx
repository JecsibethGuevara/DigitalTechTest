
import { Routes, Route } from 'react-router-dom';
import './globals.css';
import { Home } from './_root/pages';
import SigninForm from './_auth/forms/SigninForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import UserProfile from './_root/pages/UserProfile';
import SignUp from './_auth/forms/SignUp';


const App = () => {

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
          <Route element={<AuthLayout/>}>
            <Route path="/sign-in" element={<SigninForm/>}/>
            <Route index element={<SignUp/>}/>
          </Route>
          



        {/* private routes */}
        <Route element={<RootLayout/>}>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/user' element={<UserProfile/>}/>
        </Route>
        
      
      
      </Routes>
    </main>
  )
}

export default App