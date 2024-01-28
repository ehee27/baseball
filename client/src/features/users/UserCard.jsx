import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
  const navigate = useNavigate()
  //
  const user = useSelector(state => selectUserById(state, userId))

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',', ', ')

    // const cellStatus = user.active ? '' : 'table__cell--inactive'

    return (
      <div className="rounded-lg shadow-md p-3 text-black">
        <p>{user.name}</p>
        <p className="text-xs">{userRolesString}</p>
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    )
  } else return null
}
export default User
