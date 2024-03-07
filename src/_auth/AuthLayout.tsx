import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate} from "react-router-dom"

interface Logged {
  isLogged: boolean;
  usernames: string;
}

function AuthLayout() {
  const isLoggedIn = useSelector((state) => state.user);
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