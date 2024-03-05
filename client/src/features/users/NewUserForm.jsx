import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  const navigate = useNavigate()

  // ADD USER MUTATION
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()
  // ---------------------------------------------------
  // STATE
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(['User'])
  // STATE HANDLERS
  const onNameChanged = e => setName(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  // ------------------------------------------------------

  // HANDLE ROLES ARRAY BASED ON TARGET SELECTED -----------
  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      option => option.value
    )
    setRoles(values)
  }
  // CREATE USER HANDLER
  const onCreateUserClicked = async e => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ name, email, username, password, active: true, roles })
    }
  }

  // VALIDATE WITH REGEX
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  // CHECK FOR SUCCESS ---------------------------------
  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/')
    }
  }, [isSuccess, navigate])

  // CAN SAVE
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  const content = (
    <div className="h-[100vh] bg-black/90">
      <div
        className={`bg-center bg-cover bg-[url(../../../../public/assets/CWS.webp)] h-3/5`}
      >
        <div className="flex gap-2 flex-col items-center bg-black bg-opacity-75 min-h-screen px-5 py-20">
          <p>{error?.data?.message}</p>
          <p className="text-xl md:text-2xl text-white">Create an account</p>

          <form
            className="flex flex-col text-zinc-500 rounded-md p-5 w-[90%] md:w-[30%] bg-white"
            onSubmit={onCreateUserClicked}
          >
            {/* // NAME --------------------------------- */}
            <label htmlFor="name">
              Name: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={onNameChanged}
            />

            {/* // EMAIL --------------------------------- */}
            <label htmlFor="email">
              Email: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChanged}
            />

            {/* // USERNAME --------------------------------- */}
            <label htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />

            {/* // PASSWORD --------------------------------- */}
            <label htmlFor="password">
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <input
              className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />

            {/* // ROLES --------------------------------- */}
            <label htmlFor="roles">MEMBERSHIP:</label>
            <select
              id="roles"
              name="roles"
              className="bg-zinc-100 p-2 text-black"
              multiple={true}
              size="2"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>

            {/* // CREATE BUTTON --------------------------------- */}
            <button
              className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] hover:scale-105 transition-all mt-5"
              disabled={!canSave}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  return content
}
export default NewUserForm
