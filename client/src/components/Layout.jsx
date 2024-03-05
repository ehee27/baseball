import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useAuth from '../hooks/useAuth'
import DashFooter from './dash/DashFooter'

const Layout = () => {
  const { username } = useAuth()
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>

      {username ? <DashFooter /> : <Footer />}
    </>
  )
}

export default Layout
