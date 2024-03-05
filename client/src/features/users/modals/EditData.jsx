import BioCompleteForm from './BioCompleteForm'

const EditData = ({ user, openBioComplete, onClose, setTransition }) => {
  return (
    <>
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
          openBioComplete ? 'visible bg-black bg-opacity-80' : 'invisible'
        }`}
      >
        {/* <div className="hero-overlay bg-black bg-opacity-70"> */}
        <div className="flex flex-col min-h-[90%] w-[70%] md:w-[50%] pt-20 text-white">
          {/* <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900"> */}
          <p className="text-md md:text-2xl lg:text-3xl p-5 text-center">
            Let's complete your profile setup. Please provide the following
            data.
          </p>
          <BioCompleteForm user={user} onClose={onClose} />
        </div>
      </div>
    </>
  )
}

export default EditData
