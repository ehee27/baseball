import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/

const EditUserForm = ({ openEditUser, user, username, active, onClose }) => {
  // UPDATE USER MUTATION
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  // DELETE USER MUTATION
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation()

  // ---------------------------------------------------
  // STATE
  const [userSname, setUserSname] = useState(username)
  const [validUsername, setValidUsername] = useState(false)
  const [activeStatus, setActiveStatus] = useState(active)
  const [position, setPosition] = useState('')
  const [number, setNumber] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [hs, setHS] = useState('')
  const [bio, setBio] = useState('')

  // STATE HANDLERS
  const onUsernameChanged = e => setUserSname(e.target.value)
  const onActiveChanged = () => setActiveStatus(prev => !prev)
  const onPositionChanged = e => setPosition(e.target.value)
  const onNumberChanged = e => setNumber(e.target.value)
  const onAgeChanged = e => setAge(e.target.value)
  const onHeightChanged = e => setHeight(e.target.value)
  const onWeightChanged = e => setWeight(e.target.value)
  const onHSChanged = e => setHS(e.target.value)
  const onBioChanged = e => setBio(e.target.value)

  // UPDATE USER HANDLER
  const onUpdateUserClicked = async e => {
    e.preventDefault()
    await updateUser({
      id: user.id,
      username,
      active,
      position,
      number,
      age,
      height,
      weight,
      hs,
      bio,
    })
    onClose()
  }

  // DELETE USER HANDLER
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  // VALIDATE WITH REGEX
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  // CHECK FOR SUCCESS ---------------------------------
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUserSname('')
      window.location.reload()
      onClose()
    }
  }, [isSuccess, isDelSuccess])

  const content = (
    <>
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
          openEditUser ? 'visible bg-black bg-opacity-80' : 'invisible'
        }`}
      >
        <div className="flex flex-col min-h-[90%] w-[70%] md:w-[50%] pt-20 text-white">
          <p className="text-md md:text-2xl lg:text-3xl p-5 text-center">
            Edit your profile data.
          </p>
          {/* ------------------------------ */}
          <form
            className="flex flex-col border-2 rounded-md p-3 w-[100%] shadow-lg"
            onSubmit={e => e.preventDefault()}
          >
            <h2>Edit User</h2>

            {/* // USERNAME --------------------------------- */}
            <label htmlFor="username">
              Username: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={userSname}
              onChange={onUsernameChanged}
            />
            {/* // POSITION --------------------------------- */}
            <label htmlFor="position">
              Position: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="position"
              name="position"
              type="text"
              autoComplete="off"
              value={position}
              onChange={onPositionChanged}
            />
            {/* // NUMBER --------------------------------- */}
            <label htmlFor="number">
              Number: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="number"
              name="number"
              type="text"
              autoComplete="off"
              value={number}
              onChange={onNumberChanged}
            />
            {/* // AGE --------------------------------- */}
            <label htmlFor="age">
              Age: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="age"
              name="age"
              type="text"
              autoComplete="off"
              value={age}
              onChange={onAgeChanged}
            />
            {/* // HEIGHT --------------------------------- */}
            <label htmlFor="height">
              Height: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="height"
              name="height"
              type="text"
              autoComplete="off"
              value={height}
              onChange={onHeightChanged}
            />
            {/* // WEIGHT --------------------------------- */}
            <label htmlFor="weight">
              Weight: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="weight"
              name="weight"
              type="text"
              autoComplete="off"
              value={weight}
              onChange={onWeightChanged}
            />
            {/* // HS --------------------------------- */}
            <label htmlFor="hs">
              HS: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="hs"
              name="hs"
              type="text"
              autoComplete="off"
              value={hs}
              onChange={onHSChanged}
            />
            {/* // BIO --------------------------------- */}
            <label htmlFor="bio">
              Bio: <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-100 p-2 text-gray-500"
              id="bio"
              name="bio"
              type="text"
              autoComplete="off"
              value={bio}
              onChange={onBioChanged}
            />

            {/* // ACTIVE --------------------------------- */}
            <label className="border-2 p-2" htmlFor="user-active">
              ACTIVE:
              <input
                className="bg-gray-100 p-2 text-gray-500"
                id="user-active"
                name="user-active"
                type="checkbox"
                checked={activeStatus}
                onChange={onActiveChanged}
              />
            </label>

            {/* // ACTION BUTTONS --------------------------------- */}
            <div className="my-2">
              <button
                className="flex gap-2 justify-center items-center btn btn-primary bg-green-500 text-white p-3 rounded-md w-[100px]"
                title="Save"
                onClick={onUpdateUserClicked}
                // disabled={!canSave}
              >
                SAVE
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
                title="Delete"
                onClick={onDeleteUserClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button
                onClick={onClose}
                className="absolute top-10 right-10 btn btn-primary bg-green-500 text-white p-3 rounded-md w-[100px]"
                title="Save"

                // disabled={!canSave}
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

  return content
}
export default EditUserForm

// const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
// const validUserClass = !validUsername ? 'form__input--incomplete' : ''
// const validPwdClass =
//   password && !validPassword ? 'form__input--incomplete' : ''
// const validRolesClass = !Boolean(roles.length)
//   ? 'form__input--incomplete'
//   : ''

// const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
