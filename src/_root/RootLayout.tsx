import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import Trends from '@/components/shared/Trends'
import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="w-full">
      
      <Header/>
      <section>
        <Outlet/>
      </section>

    </div>
  )
}

export default RootLayout