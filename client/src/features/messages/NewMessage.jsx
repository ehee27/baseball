import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewMessageForm from './NewMessageForm'

const NewMessage = () => {
  console.log('THIS')
  const users = useSelector(selectAllUsers)

  const content = users ? <NewMessageForm users={users} /> : <p>Loading...</p>

  return content
}
export default NewMessage
