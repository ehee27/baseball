import { useState, useContext } from 'react'
import EditUserForm from '../EditUserForm'
import Loading from '../../../components/Loading'
import useAuth from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectUserById } from '../usersApiSlice'
import BioCompleteForm from '../modals/BioCompleteForm'
import ProfilePicColumn from './ProfilePicColumn'
import GamesList from '../stats/GamesList'
import { StatsContext } from '../../../context/StatsContext'
import DataColumn from './DataColumn'
import UploadStats from '../stats/UploadStats'
import StatGrid from '../stats/StatGrid'
import Bio from './Bio'
import ImageUpload from './ImageUpload'

const UserProfile = () => {
  // DESCTRUCT AUTH
  const { username, active, id, bio, stats } = useAuth()
  // CONTEXT
  // const { games } = useContext(StatsContext)
  // STATE
  const [openBioComplete, setOpenBioComplete] = useState(true)
  const [openEditUser, setOpenEditUser] = useState(false)
  const [openStats, setOpenStats] = useState(false)
  const [transition, setTransition] = useState(false)

  // SELECT USER FROM STATE -----------------------------------
  const user = useSelector(state => selectUserById(state, id))

  return (
    <div className="h-[100vh] bg-black/90">
      {!transition ? (
        <>
          {bio === '' ? (
            <BioCompleteForm
              user={user}
              openBioComplete={openBioComplete}
              onClose={() => setOpenBioComplete(!openBioComplete)}
            />
          ) : (
            <>
              {/* ---------------- OUTER DIV - bg image ------------------ */}
              <div
                className={`bg-center bg-cover bg-[url(/public/assets/Baum-Walker-Stadium-1.png)]`}
              >
                {/* ----------------- BANNER CONTENT ----------------------- */}
                <div className="bg-black/80 h-[100%] py-2 px-5 md:py-10 md:px-20">
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* ----------------- Top LEFT COLUMN -------------------- */}
                    <div className="flex flex-col justify-center items-center">
                      <ProfilePicColumn
                        user={user}
                        username={username}
                        id={id}
                      />
                    </div>
                    {/* ------------------ Top RIGHT COLUMN -------------------- */}
                    <div className="col-span-3 flex flex-col justify-end">
                      <DataColumn
                        setOpenEditUser={() => setOpenEditUser(!openEditUser)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* -------- STATS Row -------------------- */}
              <div className="p-3 bg-black/90">
                <StatGrid stats={stats} />
              </div>

              {/* -------- Lower Row -------------------- */}
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="my-2 col-span-3 bg-white p-2">
                  <Bio />
                </div>
                <div className="my-2 col-span-2">
                  <GamesList setOpenStats={() => setOpenStats(!openStats)} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
      {/* -------- MODALS --------- */}
      <EditUserForm
        user={user}
        username={username}
        active={active}
        openEditUser={openEditUser}
        onClose={() => setOpenEditUser(!openEditUser)}
      />
      <UploadStats
        openStats={openStats}
        setOpenStats={() => setOpenStats(!openStats)}
        setTransition={() => setTransition(!transition)}
      />
    </div>
  )
}

export default UserProfile
