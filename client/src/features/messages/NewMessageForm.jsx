import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewMessageMutation } from './messagesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewMessageForm = ({ users }) => {
  const navigate = useNavigate()

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

    await addNewMessage({ user: userId, title, content: text })
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

  // const errClass = isError ? "errmsg" : "offscreen"
  // const validTitleClass = !title ? "form__input--incomplete" : ''
  // const validTextClass = !text ? "form__input--incomplete" : ''

  const content = (
    <>
      <p>{error?.data?.message}</p>

      <form
        className="flex flex-col border-2 rounded-md p-3 w-[50%]"
        onSubmit={onCreateMessageClicked}
      >
        <h2>New Message</h2>

        <label htmlFor="title">Title:</label>
        <input
          className="bg-gray-100 p-2"
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="text">Text:</label>
        <textarea
          className="bg-gray-100 p-2"
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label htmlFor="username">ASSIGNED TO:</label>
        <select
          id="username"
          name="username"
          className="bg-gray-100 p-2"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
        <div className="my-2">
          <button
            className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
            title="Save"
            // disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </form>
    </>
  )

  return content
}

export default NewMessageForm
