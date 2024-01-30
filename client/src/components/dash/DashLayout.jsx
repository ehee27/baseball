import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
// import lockerRoom from '../../../public/assets/lockerRoom.png'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="p-3 min-h-screen">
        <Outlet />
      </div>
      <DashFooter />
    </>
  )
}

export default DashLayout
