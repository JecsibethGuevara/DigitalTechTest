import Header from '@/components/shared/Header';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux

function RootLayout() {
  // Assuming your Redux store has a 'user' slice
  let isLoggedIn = useSelector((state: { user: any; }) => state.user);
  console.log(isLoggedIn)

  return (
    <>
      {isLoggedIn.username ? (
        <div className="w-full">
          <Header />
          <section>
            <Outlet />
          </section>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default RootLayout;
