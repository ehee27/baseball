import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import Loading from '../../components/Loading'
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
  const [transition, setTransition] = useState(false)
  // STATE HANDLERS
  const handleUserInput = e => setUsername(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)
  const handlePersist = () => setPersist(!persist)

  // SET FOCUS AND ERROR MESSAGE
  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setTransition(true)
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      // navigate('/dash')
    } catch (err) {
      console.log(err)
      errRef.current.focus()
    }
    setTimeout(() => {
      setTransition(false)
      navigate('/dash')
    }, 1000)
  }

  if (isLoading) return <Loading />

  const content = (
    <>
      {transition ? (
        <Loading />
      ) : (
        <div className="h-[100vh] bg-black/90">
          <div
            className={`bg-center bg-cover bg-[url(../../../../public/assets/CWS.webp)] h-3/5`}
          >
            <div className="flex gap-2 flex-col items-center bg-black bg-opacity-75 min-h-screen px-5 py-20">
              <p className="text-xl md:text-2xl text-white">Sign in</p>
              <form
                className="flex flex-col text-zinc-500 rounded-md p-5 w-[90%] md:w-[30%] bg-white"
                onSubmit={handleSubmit}
              >
                <label htmlFor="username">Username:</label>
                <input
                  className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
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
                  className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
                  type="password"
                  id="password"
                  onChange={handlePwdInput}
                  value={password}
                  required
                />
                <div className="flex gap-2 my-5">
                  <input
                    className="p-2"
                    type="checkbox"
                    id="persist"
                    onChange={handlePersist}
                    checked={persist}
                  />
                  <label>Trust This Device</label>
                </div>

                <button className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] hover:scale-105 transition-all">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )

  return content
}
export default Login
