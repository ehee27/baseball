import { useState } from 'react'
import { useAddNewMessageMutation } from '../../messages/messagesApiSlice'
import useAuth from '../../../hooks/useAuth'
const CardModal = ({ user, onClose, openCard }) => {
  // DESTRUCTURE AUTH
  const { id } = useAuth()
  // ADD MESSAGE MUTATION
  const [addNewMessage, { isLoading, isSuccess, isError, error }] =
    useAddNewMessageMutation()

  // STATE
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // HANDLE UPDATE
  const handleCreateMessage = async e => {
    e.preventDefault()
    await addNewMessage({ author: id, assignedTo: user.id, title, content })
    setTitle('')
    setContent('')
    window.location.reload()
  }
  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
        openCard ? 'visible bg-black bg-opacity-80' : 'invisible'
      }`}
    >
      <div className="rounded shadow-md p-5 text-zinc-600 my-1 w-[100%] md:w-[60%] min-h-[50%] bg-zinc-900">
        {/* ----------- TOP BANNER ------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ----------- LEFT DIV ------------------ */}
          <div className="pb-5 flex justify-center">
            <img
              className="shadow-md h-[170px] w-[130px] rounded"
              src={`/public/assets/${user.profilePic}`}
            ></img>
          </div>
          {/* ----------- RIGHT DIV ------------------ */}
          <div className="flex flex-col justify-center items-center text-zinc-500 p-2">
            <div className="flex justify-center items-center w-[100%] text-white">
              {' '}
              <p className="text-3xl md:text-3xl px-2">{user.name}</p>
              <p className="text-3xl">|</p>
              <p className="text-3xl md:text-3xl px-2">{user.position}</p>
            </div>
            {/* ----------- NAME & POSITION ------------------ */}

            {/* ----------- HEIGHT WEIGHT ------------------ */}
            <div className="flex justify-center gap-2 text-white">
              <p>{user.height} - </p>
              <p> {user.weight}</p>
            </div>
            {/* ----------- HIGHSCHOOL ------------------ */}
            <div className="text-orange-500">
              <p>{user.hs}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded border-4">
          <form
            className="flex flex-col text-zinc-500 rounded-md p-5 w-[90%] md:w-[100%] bg-white"
            onSubmit={handleCreateMessage}
          >
            <label htmlFor="title">Subject:</label>
            <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              id="title"
              name="title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label htmlFor="text">Message:</label>
            <textarea
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              rows={4}
              id="text"
              name="text"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <div className="my-2">
              <button
                className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] hover:scale-105 transition-all"
                title="Save"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>

      <button
        onClick={onClose}
        className="fixed top-10 right-10 border-2 border-transparent bg-orange-600 text-white p-3 rounded-md hover:bg-zinc-900 hover:border-white hover:scale-105 transition-all"
      >
        X
      </button>
    </div>
  )
}

export default CardModal
