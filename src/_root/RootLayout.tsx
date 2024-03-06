import Header from '@/components/shared/Header'
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'

function RootLayout() {
  const [isLoggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')).isLogged);

  return (
    <>
    {isLoggedIn ? (
      <div className="w-full">
      
      <Header/>
      <section>
        <Outlet/>
      </section>

    </div>
    ):(
      <Navigate to="/"/>
    )}
  </>
  )
}

export default RootLayout

