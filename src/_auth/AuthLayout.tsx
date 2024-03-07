import { useEffect, useState } from "react";
import { Outlet, Navigate} from "react-router-dom"

interface Logged {
  isLogged: boolean;
  usernames: string;
}

function AuthLayout() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      let logged = localStorage.getItem('isLoggedIn')
      if (logged) {
        logged = JSON.parse(logged)
        setLoggedIn(logged.isLogged)
      }
    }


  }, [])
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/Home" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout 