import { useState, useEffect } from 'react'
import { storage } from '../../../firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { useUpdateUserMutation } from '../usersApiSlice'

const ImageUpload = ({ username, id }) => {
  // STATE
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])

  // UPDATE MUTATION
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  // ref of image file in FB
  const imageListRef = ref(storage, `profile-pics/${username}`)

  // render the imageList on mount
  // useEffect(() => {
  //   listAll(imageListRef).then(res => {
  //     res.items.forEach(item => {
  //       getDownloadURL(item).then(url => {
  //         setImageList(prev => [...prev, url])
  //         console.log('This is the imageList', imageList)
  //       })
  //     })
  //   })
  // }, [])

  // HANDLE UPLOAD image to FB and update user in Mongo
  const uploadImage = async e => {
    e.preventDefault()
    if (imageUpload == null) return
    try {
      // create ref to FB storage and name PATH
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
      console.log('Image uploaded!')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="border-4 p-5">
      <p>Image upload</p>
      <input type="file" onChange={e => setImageUpload(e.target.files[0])} />
      <button
        onClick={uploadImage}
        className="bg-white text-black  py-2 px-5 hover:cursor-pointer hover:scale-105 transition-all"
      >
        UPLOAD IMAGE
      </button>
      <img src={imageList[0]} className="h-[200px] w-[130px]"></img>
    </div>
  )
}

export default ImageUpload
