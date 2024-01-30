import { useState, useEffect } from 'react'
import {
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} from './messagesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import useAuth from '../../hooks/useAuth'

const EditMessageForm = ({ message, users, id }) => {
  const navigate = useNavigate()

  // UPDATE MESSAGE MUTATION
  const [updateMessage, { isLoading, isSuccess, error }] =
    useUpdateMessageMutation()
  // DELETE MESSAGE MUTATION
  const [
    deleteMessage,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteMessageMutation()

  // ---------------------------------------------------
  // STATE
  const [title, setTitle] = useState(message.title)
  const [text, setText] = useState(message.text)
  const [read, setRead] = useState(message.read)
  const [userId, setUserId] = useState(message.user)

  // STATE HANDLERS
  const onTextChanged = e => setText(e.target.value)
  const onReadChanged = () => setRead(prev => !prev)
  const onUserIdChanged = e => setUserId(e.target.value)

  // DELETE MESSAGE ------------------------------------
  const onDeleteMessageClicked = async e => {
    e.preventDefault()
    // setTransition(true)
    await deleteMessage({ id: message.id })
    // setTransition(false)
    navigate('/dash/messages')
  }
  // SAVE MESSAGE --------------------------------------
  const onSaveMessageClicked = async e => {
    e.preventDefault()
    // if (canSave) {
    await updateMessage({
      id: message.id,
      user: userId,
      title,
      content: text,
      read,
    })
    // }
  }

  // CHECK FOR SUCCESS ---------------------------------
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      // setTransition(true)
      setTimeout(() => {
        // setTransition(false)
        // navigate(`/dash/messages/${id}`)
        navigate('/dash/messages')
      })
      setTitle('')
      setText('')
      setUserId('')
    }
  }, [isSuccess, isDelSuccess, navigate])

  // CAN SAVE
  const canSave = [title, text, userId].every(Boolean) && !isLoading

  // Delete Button
  // let deleteButton = null
  // if (isCoach || isPlayer) {
  //   deleteButton = (
  //     <button
  //       className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
  //       onClick={onDeleteMessageClicked}
  //     >
  //       DELETE <FontAwesomeIcon icon={faTrashCan} />
  //     </button>
  //   )
  // }

  // User options -------------------------------------------
  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  // CONTENT
  const content = (
    <>
      <form
        className="flex flex-col border-2 rounded-md p-3 w-[50%]"
        onSubmit={e => e.preventDefault()}
      >
        <div>
          {/* <h2>Edit Message</h2> */}
          <div></div>
        </div>
        <label htmlFor="password">Content:</label>
        <textarea
          className="bg-gray-100 p-2 text-gray-500"
          id="text"
          name="text"
          type="text"
          value={text}
          onChange={onTextChanged}
        />

        <label htmlFor="message-read">
          Read:
          <input
            className="bg-gray-100 p-2 text-gray-500"
            id="message-read"
            name="message-read"
            type="checkbox"
            checked={read}
            onChange={onReadChanged}
          />
        </label>

        <label htmlFor="roles">ASSIGNED USER:</label>
        <select
          className="bg-gray-100 p-2 text-gray-500"
          id="user"
          name="user"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
        <div className="flex gap-4 mt-4">
          <button
            className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
            title="Save"
            onClick={onSaveMessageClicked}
            // disabled={!canSave}
          >
            SAVE <FontAwesomeIcon icon={faSave} />
          </button>
          {/* {deleteButton} */}
        </div>
      </form>
    </>
  )
  return <>{content}</>
}

export default EditMessageForm
