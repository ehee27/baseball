import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/

const EditUserForm = ({ user }) => {
  const navigate = useNavigate()

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
  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)

  // STATE HANDLERS
  const onUsernameChanged = e => setUsername(e.target.value)

  // HANDLE ROLES ARRAY BASED ON TARGET SELECTED -----------
  const onRolesChanged = e => {
    const values = Array.from(e.target.selectedOptions, option => option.value)
    setRoles(values)
  }
  // HANDLE ACTIVE
  const onActiveChanged = () => setActive(prev => !prev)

  // UPDATE USER HANDLER
  const onUpdateUserClicked = async e => {
    e.preventDefault()
    await updateUser({ id: user.id, username, active })
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
      setUsername('')
      // setRoles([])
      // onClose()
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  // POPULATE ROLES options
  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  // let canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  // let canSave = [validUsername].every(Boolean) && !isLoading
  // if (password) {
  //   canSave =
  //     [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  // } else {
  //   canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  // }

  const content = (
    <>
      {/* ------------------------------ */}
      <form
        className="flex flex-col border-2 rounded-md p-3 w-[50%]"
        onSubmit={e => e.preventDefault()}
      >
        <h2>Edit User</h2>

        {/* // USERNAME --------------------------------- */}
        <label htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className="bg-gray-100 p-2 text-gray-500"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        {/* // ACTIVE --------------------------------- */}
        <label className="border-2 p-2" htmlFor="user-active">
          ACTIVE:
          <input
            className="bg-gray-100 p-2 text-gray-500"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label htmlFor="roles">ASSIGNED ROLES:</label>
        <select
          id="roles"
          name="roles"
          className="bg-gray-100 p-2 text-gray-500"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

        {/* // ACTION BUTTONS --------------------------------- */}
        <div className="my-2">
          <button
            className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
            title="Save"
            onClick={onUpdateUserClicked}
            // disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
            title="Delete"
            onClick={onDeleteUserClicked}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </form>
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
