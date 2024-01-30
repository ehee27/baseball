import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messagesApiSlice'

const MessageCard = ({ messageId }) => {
  const navigate = useNavigate()
  //
  const message = useSelector(state => selectMessageById(state, messageId))
  if (message) {
    const created = new Date(message.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })

    const updated = new Date(message.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })

    const handleEdit = () => navigate(`/dash/messages/${messageId}`)

    return (
      <div className="rounded-lg shadow-md p-3 text-black">
        <p>{message.title}</p>
        <p>{message.content}</p>
        <p className="text-xs">Created: {created}</p>
        <p className="text-xs">Updated: {updated}</p>
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    )
  } else return null
}

export default MessageCard
