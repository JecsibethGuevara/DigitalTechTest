import { useSelector } from "react-redux";
import { Outlet, Navigate} from "react-router-dom"

function AuthLayout() {
  let isLoggedIn = useSelector((state: { user: any; }) => state.user.username);
  console.log(isLoggedIn)
  return (
    <>
      {isLoggedIn  ? (
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