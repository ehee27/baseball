import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import Loading from '../../components/Loading'
import UserCard from './UserCard'

const UserDetails = ({ userId }) => {
  const { id } = useParams()

  const user = useSelector(state => selectUserById(state, id))

  const content = user ? (
    <div className="border-2">
      <p>{user.name}</p>
      <div className="border-4 border-red-500">
        THIS SHIT
        {/* <UserDetailsForm user={user} /> */}
        <UserCard userId={userId} />
      </div>
    </div>
  ) : (
    <Loading />
  )
  // const content = <p>Edit user page...</p>

  return content
}
export default UserDetails
