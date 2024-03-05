import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewMessageMutation } from './messagesApiSlice'
import useAuth from '../../hooks/useAuth'

const NewMessageForm = ({ users }) => {
  const navigate = useNavigate()
  const { id } = useAuth()

  // ADD MESSAGE MUTATION
  const [addNewMessage, { isLoading, isSuccess, isError, error }] =
    useAddNewMessageMutation()
  // ---------------------------------------------------
  // STATE
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)
  // STATE HANDLERS
  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)
  // ------------------------------------------------------

  // CREATE MESSAGE HANDLER
  const onCreateMessageClicked = async e => {
    e.preventDefault()
    // if (canSave) {
    //   await addNewMessage({ user: userId, title, text })
    // }

    await addNewMessage({
      author: id,
      assignedTo: userId,
      title,
      content: text,
    })
  }
  // CHECK FOR SUCCESS ---------------------------------
  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      // setUserId('')
      navigate('/dash/messages')
    }
  }, [isSuccess, navigate])

  // const canSave = [title, text, userId].every(Boolean) && !isLoading

  // CREATE THE USER OPTIONS
  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  const content = (
    <div
      className={`bg-center bg-cover bg-[url(../../../public/assets/CWS.webp)] min-h-screen`}
    >
      <div className="flex gap-2 flex-col items-center bg-black bg-opacity-75 min-h-screen pt-20">
        <p>{error?.data?.message}</p>

        <form
          className="flex flex-col border-2 border-white text-white rounded-md p-3 w-[90%] md:w-[60%]"
          onSubmit={onCreateMessageClicked}
        >
          <h2>New Message</h2>

          <label htmlFor="title">Title:</label>
          <input
            className="bg-gray-100 p-2 text-black"
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
          />

          <label htmlFor="text">Text:</label>
          <textarea
            className="bg-gray-100 p-2 text-black"
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
          />

          <label htmlFor="username">ASSIGNED TO:</label>
          <select
            id="username"
            name="username"
            className="bg-gray-100 p-2 text-black"
            value={userId}
            onChange={onUserIdChanged}
          >
            {options}
          </select>
          <div className="my-2">
            <button
              className="flex gap-2 btn btn-primary bg-green-500 text-white p-3 rounded-md"
              title="Save"
              // disabled={!canSave}
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return content
}

export default NewMessageForm
