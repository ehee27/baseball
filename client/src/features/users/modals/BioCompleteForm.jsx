import { useState, useEffect } from 'react'
import { useUpdateUserMutation } from '../usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const positionOptions = ['Position', 'P', 'C', '1B', '2B', 'SS', '3B', 'OF']
const batOptions = ['Bats', 'R', 'L']
const throwOptions = ['Throws', 'R', 'L']

const USER_REGEX = /^[A-z]{3,20}$/

const BioCompleteForm = ({ user, openBioComplete, onClose }) => {
  const navigate = useNavigate()

  // UPDATE USER MUTATION
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  // ---------------------------------------------------
  // STATE
  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [active, setActive] = useState(user.active)
  const [position, setPosition] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bats, setBats] = useState('')
  const [throws, setThrows] = useState('')
  const [hs, setHS] = useState('')
  const [bio, setBio] = useState('')

  // STATE HANDLERS
  const onUsernameChanged = e => setUsername(e.target.value)
  const onActiveChanged = () => setActive(prev => !prev)
  const onPositionChanged = e => setPosition(e.target.value)
  const onAgeChanged = e => setAge(e.target.value)
  const onHeightChanged = e => setHeight(e.target.value)
  const onWeightChanged = e => setWeight(e.target.value)
  const onBatsChanged = e => setBats(e.target.value)
  const onThrowsChanged = e => setThrows(e.target.value)
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
      age,
      height,
      weight,
      bats,
      throws,
      hs,
      bio,
    })
    onClose()
  }

  // VALIDATE WITH REGEX
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  // CHECK FOR SUCCESS ---------------------------------
  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      // onClose()
      // navigate('/dash/users')
      window.location.reload()
      navigate('/dash/users/profile')
    }
  }, [isSuccess, navigate])

  // SELECT OPTIONS
  const positionSelections = positionOptions.map((item, i) => (
    <option key={i} value={item}>
      {item}
    </option>
  ))
  const batSelections = batOptions.map((item, i) => (
    <option key={i} value={item}>
      {item}
    </option>
  ))
  const throwSelections = throwOptions.map((item, i) => (
    <option key={i} value={bats}>
      {item}
    </option>
  ))

  const content = (
    <>
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
          openBioComplete ? 'visible' : 'invisible'
        }`}
      >
        <div className="flex gap-2 flex-col items-center bg-black bg-opacity-75 min-h-screen px-5 py-20 w-[90%]">
          <p className="text-md md:text-2xl lg:text-3xl p-5 text-center text-white">
            Welcome<span className="text-orange-500"> {username}</span>, let's
            complete your profile setup.
          </p>
          {/* ------------------------------ */}
          <form
            className="flex flex-col text-zinc-500 rounded-md p-5 bg-white w-[100%] md:w-[50%]"
            onSubmit={e => e.preventDefault()}
          >
            <div className="pl-2">
              <p>Primary Info.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <input
                className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
                id="age"
                name="age"
                type="text"
                autoComplete="off"
                value={age}
                onChange={onAgeChanged}
                placeholder="Age"
              />

              <input
                className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
                id="height"
                name="height"
                type="text"
                autoComplete="off"
                value={height}
                onChange={onHeightChanged}
                placeholder="Height"
              />

              <input
                className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
                id="weight"
                name="weight"
                type="text"
                autoComplete="off"
                value={weight}
                onChange={onWeightChanged}
                placeholder="Weight"
              />
            </div>
            <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1 w-[100%] md:w-[33%]"
              id="hs"
              name="hs"
              type="text"
              autoComplete="off"
              value={hs}
              onChange={onHSChanged}
              placeholder="High School"
            />
            <div className="pl-2 mt-5">
              <p>Player Specs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <select
                className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
                id="position"
                name="position"
                value={position}
                onChange={onPositionChanged}
              >
                {positionSelections}
              </select>

              <select
                className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
                id="bats"
                name="bats"
                value={bats}
                onChange={onBatsChanged}
              >
                {batSelections}
              </select>

              <select
                className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
                id="throws"
                name="throws"
                value={throws}
                onChange={onThrowsChanged}
              >
                {throwSelections}
              </select>
            </div>

            {/* <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1 w-[100%] md:w-[33%]"
              id="hs"
              name="hs"
              type="text"
              autoComplete="off"
              value={hs}
              onChange={onHSChanged}
              placeholder="High School"
            /> */}
            {/* // BIO --------------------------------- */}
            {/* <label htmlFor="bio">
              Bio: <span className="nowrap"></span>
            </label> */}
            <div className="pl-2 mt-5">
              <p>Player Bio</p>
            </div>
            <textarea
              rows={5}
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black m-1"
              id="bio"
              name="bio"
              type="textarea"
              autoComplete="off"
              value={bio}
              onChange={onBioChanged}
              placeholder="Please tell us about yourself"
            />

            {/* // ACTIVE --------------------------------- */}
            <div className="flex gap-1 pl-1">
              <label className="p-2" htmlFor="user-active">
                Active:
              </label>
              <input
                className="bg-gray-100 p-2 text-gray-500"
                id="user-active"
                name="user-active"
                type="checkbox"
                checked={active}
                onChange={onActiveChanged}
              />
            </div>

            {/* // ACTION BUTTONS --------------------------------- */}
            <div className="my-2">
              <button
                className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] hover:scale-105 transition-all mt-3"
                title="Save"
                onClick={onUpdateUserClicked}
                // disabled={!canSave}
              >
                SAVE
                {/* <FontAwesomeIcon icon={faSave} /> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

  return content
}
export default BioCompleteForm
