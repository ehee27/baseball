import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMessageById } from '../messagesApiSlice'
import { selectAllUsers } from '../../users/usersApiSlice'
import EditMessageForm from './EditMessageForm'
import Loading from '../../../components/Loading'

const EditMessage = () => {
  const { id } = useParams()

  const message = useSelector(state => selectMessageById(state, id))
  const users = useSelector(selectAllUsers)

  const content =
    message && users ? (
      <EditMessageForm message={message} users={users} />
    ) : (
      <Loading />
    )

  return content
}
export default EditMessage
