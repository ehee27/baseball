// the message will check with optional chaining if author and/or assignTo match the authorized user ID
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messagesApiSlice'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import EditModal from './edit/EditModal'

const MessageCard = ({ messageId }) => {
  const { id } = useAuth()
  const navigate = useNavigate()
  //
  const [openEditModal, setOpenEditModal] = useState(false)
  const message = useSelector(state => selectMessageById(state, messageId))
  if (message?.author === id || message?.assignedTo === id) {
    const created = new Date(message.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })

    const updated = new Date(message.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })
    const handleEdit = () => navigate(`/dash/messages/${messageId}`)

    return (
      <div className="bg-white rounded shadow-md p-3 text-zinc-600 my-1">
        <p className="text-sm">
          Subject:<span className="font-bold ml-1">{message.title}</span>{' '}
        </p>

        <p className="text-xs text-green-700 font-bold">{created}</p>
        <button
          onClick={() => setOpenEditModal(!openEditModal)}
          className="border-2 p-1 text-xs mt-2 rounded-md bg-zinc-200"
        >
          View Thread
        </button>
        <EditModal
          message={message}
          openEditModal={openEditModal}
          onClose={() => setOpenEditModal(!openEditModal)}
          created={created}
        />
      </div>
    )
  } else return null
}

export default MessageCard
