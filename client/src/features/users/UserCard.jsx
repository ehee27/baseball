import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
// import EditData from './modals/EditData'

const User = ({ userId }) => {
  const navigate = useNavigate()
  //
  // const [openEdit, setOpenEdit] = useState(false)
  const user = useSelector(state => selectUserById(state, userId))

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)
    // const handleEdit = () => navigate('/dash/users/profile')
    // const handleEdit = () => setOpenEdit(!openEdit)

    const userRolesString = user.roles.toString().replaceAll(',', ', ')

    return (
      <div className="rounded-lg border-2 shadow-md p-3 text-black my-2">
        <p>{user.name}</p>
        <p>{user.username}</p>
        <p className="text-xs">{userRolesString}</p>
        <p
          className={`font-black ${
            user.active === true ? `text-green-400` : `text-red-400`
          }`}
        >
          {user.active === true ? <span>ACTIVE</span> : <span>INACTIVE</span>}
        </p>
        <button className="btn btn-secondary" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        {/* <EditData
          user={user}
          openEdit={openEdit}
          onClose={() => setOpenEdit(!openEdit)}
        /> */}
      </div>
    )
  } else return null
}
export default User
