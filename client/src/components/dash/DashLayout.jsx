import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
// import lockerRoom from '../../../public/assets/lockerRoom.png'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="border-4 border-red-400 p-3">
        <Outlet />
      </div>
      <DashFooter />
    </>
  )
}

export default DashLayout
