import { useState } from 'react'
import ProfilePicUpload from '../modals/ProfilePicUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImagePortrait } from '@fortawesome/free-solid-svg-icons'

const EditRow = ({ user }) => {
  const [openProfilePic, setOpenProfilePic] = useState(false)
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 bg-black opacity-85 p-1">
      {/* <ProfilePicUpload
        user={user}
        openProfilePic={openProfilePic}
        onClose={() => setOpenProfilePic(!openProfilePic)}
      /> */}
      <div className="flex justify-center items-center">
        <button
          onClick={() => setOpenProfilePic(!openProfilePic)}
          className="flex justify-center items-center rounded-md mt-2 bg-zinc-400 text-white w-[35%] h-[30px] md:w-[20%]"
        >
          <FontAwesomeIcon
            className="h-[15px] text-white"
            icon={faImagePortrait}
          />
        </button>
      </div>
      <div className="flex gap-4 items-center col-span-3">
        {/* <button className="flex justify-center items-center border-2 p-3 rounded-md my-2 bg-zinc-700 text-white w-[35%] h-[30px] md:w-[20%]">
          MESSAGES
        </button> */}
        <button className="flex justify-center items-center border-2 p-3 rounded-md my-2 bg-zinc-700 text-white w-[35%] h-[30px] md:w-[20%]">
          EDIT
        </button>
      </div>
    </div>
  )
}

export default EditRow
