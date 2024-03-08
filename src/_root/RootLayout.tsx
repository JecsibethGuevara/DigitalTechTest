import Header from '@/components/shared/Header';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux

function RootLayout() {
  let isLoggedIn = useSelector((state: { user: any; }) => state.user.username);
  console.log(isLoggedIn, 'loged')

  return (
    <>
      {isLoggedIn ? (
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
