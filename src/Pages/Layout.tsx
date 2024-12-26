import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
     <Header/>

    
      <div className="min-h-screen container mx-auto px-4 py-8 bg-muted/70">
        <Outlet />
      </div>
      
    
      <footer className="border-t backdrop-blur py-12">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p>Made with 💗 by Kusal</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
