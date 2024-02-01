import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewMessageForm from './NewMessageForm'

const NewMessage = () => {
  const users = useSelector(selectAllUsers)
  // NEED TO CHECK IF WE HAVE ANY USERS
  if (!users.length) return <p>Not Currently Available</p>

  const content = <NewMessageForm users={users} />

  return content
}
export default NewMessage
