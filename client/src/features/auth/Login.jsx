import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
//
import usePersist from '../../hooks/usePersist'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //
  const [persist, setPersist] = usePersist()

  // LOGIN MUTATION
  const [login, { isLoading }] = useLoginMutation()

  // ---------------------------------------------------
  // STATE
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [errMsg, setErrMsg] = useState('')
  // STATE HANDLERS
  const handleUserInput = e => setUsername(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)
  const handlePersist = () => setPersist(!persist)

  // SET FOCUS AND ERROR MESSAGE
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // useEffect(() => {
  //   setErrMsg('')
  // }, [username, password])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      // if (!err.status) {
      //   setErrMsg('No Server Response')
      // } else if (err.status === 400) {
      //   setErrMsg('Missing Username or Password')
      // } else if (err.status === 401) {
      //   setErrMsg('Unauthorized')
      // } else {
      //   setErrMsg(err.data?.message)
      // }
      console.log(err)
      errRef.current.focus()
    }
  }

  // const errClass = errMsg ? 'errmsg' : 'offscreen'

  if (isLoading) return <p>Loading...</p>

  const content = (
    <div className="bg-gray-100 p-3">
      <div className="py-10">
        <p className="text">Sign in</p>
        <form
          className="flex flex-col border-2 rounded-md p-3 w-[100%] md:w-[60%] lg:w-[40%]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username:</label>
          <input
            className="bg-white rounded-lg p-2 shadow-inner shadow-gray-200"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="bg-white rounded-lg p-2 shadow-inner shadow-gray-200"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <div className="flex gap-2 my-2">
            <input
              className="p-2"
              type="checkbox"
              id="persist"
              onChange={handlePersist}
              checked={persist}
            />
            <label>Trust This Device</label>
          </div>

          <button className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )

  return content
}
export default Login
