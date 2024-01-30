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
      navigate('/dash/users')
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
    <>
      <p>{error?.data?.message}</p>

      <form
        className="flex flex-col border-2 rounded-md p-3 w-[50%]"
        onSubmit={onCreateUserClicked}
      >
        <h2>New User</h2>

        {/* // NAME --------------------------------- */}
        <label htmlFor="name">
          Name: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className="bg-gray-100 p-2"
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
          className="bg-gray-100 p-2"
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
          className="bg-gray-100 p-2"
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
          className="bg-gray-100 p-2"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        {/* // ROLES --------------------------------- */}
        <label htmlFor="roles">ASSIGNED ROLES:</label>
        <select
          id="roles"
          name="roles"
          className="bg-gray-100 p-2"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

        {/* // CREATE BUTTON --------------------------------- */}
        <div className="my-2">
          <button
            className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
            title="Save"
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </form>
    </>
  )

  return content
}
export default NewUserForm

// const errClass = isError ? 'errmsg' : 'offscreen'
// const validUserClass = !validUsername ? 'form__input--incomplete' : ''
// const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
// const validRolesClass = !Boolean(roles.length)
//   ? 'form__input--incomplete'
//   : ''
