import { useState } from 'react'
import { useUpdateMessageMutation } from '../messagesApiSlice'
import ThreadCard from './ThreadCard'
const EditModal = ({ message, openEditModal, created, onClose }) => {
  //
  // UPDATE MESSAGE MUTATION
  const [updateMessage, { isLoading }] = useUpdateMessageMutation()

  // STATE
  const [content, setContent] = useState('')

  // HANDLE UPDATE
  const handleUpdate = async e => {
    e.preventDefault()
    await updateMessage({
      id: message._id,
      author: message.author,
      assignedTo: message.assignedTo,
      title: message.title,
      content: content,
      read: message.read,
    })
    setContent('')
  }
  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
        openEditModal ? 'visible bg-black bg-opacity-80' : 'invisible'
      }`}
    >
      <div className="bg-white rounded shadow-md p-5 text-zinc-600 my-1 w-[80%] min-h-[50%]">
        <div className="items-center flex gap-2 my-2">
          <p>Thread:</p> <p className="text-lg font-bold">{message.title}</p>
        </div>

        {/* ---------- MAP THREAD ------------------- */}
        <div className="px-5 max-h-[400px] overflow-y-scroll bg-zinc-300 rounded shadow-inner shadow-zinc-900">
          {message?.thread.map((item, i) => {
            return <ThreadCard thread={item} key={i} />
          })}
        </div>
        <div className="my-2">
          {/* ----------UPDATE FORM ------------------- */}
          <form
            className="flex flex-col text-zinc-500 rounded-md p-2 bg-white w-[100%]"
            onSubmit={e => e.preventDefault()}
          >
            <label htmlFor="password">Reply:</label>
            <textarea
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              rows={4}
              id="content"
              name="content"
              // type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
            />

            <div className="flex gap-4 mt-4">
              <button
                className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] hover:scale-105 transition-all"
                title="Save"
                onClick={handleUpdate}
              >
                POST
              </button>
              {/* {deleteButton} */}
            </div>
          </form>
        </div>
        <button
          onClick={onClose}
          className="fixed top-10 right-10 border-2 border-transparent bg-orange-600 text-white p-3 rounded-md hover:bg-zinc-900 hover:border-white hover:scale-105 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default EditModal
