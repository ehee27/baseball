import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImagePortrait } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../hooks/useAuth'
import ProfilePicUpload from '../modals/ProfilePicUpload'
import dummyPic from '../../../../public/assets/player.png'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../firebase'

const ProfilePicColumn = ({ user, username, id }) => {
  // AUTH
  const { profilePic } = useAuth()
  // STATE
  const [openProfilePic, setOpenProfilePic] = useState(false)
  const [imageList, setImageList] = useState([])

  // ref the Images in FB
  const imageListRef = ref(storage, `profile-pics/${username}`)
  //
  useEffect(() => {
    listAll(imageListRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImageList(prev => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <div className="ml-2 rounded-md">
      <ProfilePicUpload
        user={user}
        username={username}
        id={id}
        openProfilePic={openProfilePic}
        onClose={() => setOpenProfilePic(!openProfilePic)}
      />
      <div className="bg-black/50 p-2 rounded-t-md">
        <img
          className="shadow-md h-[300px] w-[250px] rounded"
          src={profilePic === '' ? dummyPic : imageList[0]}
        ></img>
      </div>
      {user && (
        <div className="flex gap-2 justify-center bg-black/50 rounded-b-md p-1">
          <button
            onClick={() => setOpenProfilePic(!openProfilePic)}
            className="flex justify-center items-center border-2 border-orange-500/80 bg-orange-900 hover:border-white p-3 rounded-md my-2 h-[35px] transition-all"
          >
            <FontAwesomeIcon
              className="h-[15px] text-white"
              icon={faImagePortrait}
            />
          </button>
          <button className="flex justify-center items-center border-2 border-orange-500/80 bg-zinc-900 hover:border-white p-3 rounded-md my-2 h-[35px] text-white transition-all">
            EDIT INFO
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePicColumn
