// import EditUser from '../EditUser'
import EditUserForm from '../EditUserForm'

const EditData = ({ user, openEdit, onClose, setTransition }) => {
  return (
    <>
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
          openEdit ? 'visible bg-black bg-opacity-80' : 'invisible'
        }`}
      >
        {/* <div className="hero-overlay bg-black bg-opacity-70"> */}
        <div className="flex flex-col min-h-[100%] pt-20 text-white">
          {/* <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900"> */}
          <p className="text-ml md:text-xl text-center">Edit user</p>
          <p className="text-xl md:text-2xl lg:text-3xl p-5 text-center">
            Please provide the following data.
          </p>
          <EditUserForm user={user} onClose={onClose} />

          <button
            className="btn btn-primary bg-green-600 rounded-md p-2 my-2 w-[50%]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default EditData
