import { useState } from 'react'
import { useUpdateUserMutation } from '../usersApiSlice'
import Loading from '../../../components/Loading'
import { storage } from '../../../firebase'
import { ref, uploadBytes } from 'firebase/storage'
// import { toast } from 'react-toastify'

const ProfilePic = ({ user, openProfilePic, onClose, username, id }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [imageUpload, setImageUpload] = useState(null)
  console.log('This is the username', username)
  // HANDLE UPLOAD
  const handleUpload = async e => {
    e.preventDefault()
    if (imageUpload == null) return
    try {
      const imageRef = ref(
        storage,
        `profile-pics/${username}/${imageUpload.name}`
      )
      uploadBytes(imageRef, imageUpload).then(() => {
        alert('Image Uploaded')
      })
      // UPDATE USER IN MONGO
      await updateUser({
        id,
        profilePic: imageUpload.name,
      })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
        openProfilePic ? 'visible bg-black bg-opacity-80' : 'invisible'
      }`}
    >
      {/* ACTUAL MODAL CONTENT ------------------------------------- */}
      {isLoading ? (
        <Loading />
      ) : (
        <div
          onClick={e => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-5 transition-all text-zinc-600 my-1 w-[80%] md:w-[60%] h-[20%] flex flex-col justify-center items-center ${
            openProfilePic ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
          }`}
        >
          <div className="text-md md:text-xl mb-3">Upload Profile Pic</div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
            <div className="flex justify-center items-center p-1">
              {/* <input
                className="text-sm"
                type="file"
                accept="image/"
                onChange={e => setFile(e.target.files[0])}
              /> */}
              <input
                type="file"
                onChange={e => setImageUpload(e.target.files[0])}
              />
            </div>

            <div className="p-1">
              <button
                onClick={handleUpload}
                className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] hover:scale-105 transition-all"
              >
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={onClose}
        className="fixed top-10 right-10 border-2 border-transparent bg-orange-600 text-white p-3 rounded-md hover:bg-zinc-900 hover:border-white hover:scale-105 transition-all"
      >
        X
      </button>
      {/* </div> */}
    </div>
  )
}

export default ProfilePic

// const handleUpload = async e => {
//   e.preventDefault()
//   try {
//     // package the form data
//     const formData = new FormData()
//     formData.append('file', file)
//     // upload said form data
//     uploadPic(formData)
//     //
//     await updateUser({
//       id: user.id,
//       profilePic: file.name,
//     })
//     onClose()
//     window.location.reload()
//   } catch (error) {
//     // toast.error(error)
//   }
// }
