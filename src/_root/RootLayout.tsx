import Header from '@/components/shared/Header';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux

function RootLayout() {
  // Assuming your Redux store has a 'user' slice
  const isLoggedIn = useSelector((state) => state.user); // Adjust this based on your actual state structure

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
