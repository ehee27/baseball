import { Outlet, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  // ---------------------------------------------------
  // STATE
  const [trueSuccess, setTrueSuccess] = useState(false)

  // REFRESH MUTATION
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      // VERIFY FUNCTION -------------------------------------
      const verifyRefreshToken = async () => {
        // console.log('verifying refresh token')
        try {
          //const response =
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
          //
        } catch (err) {
          console.error(err)
        }
      }
      // IF NO TOKEN - call verifyRefreshToken()
      if (!token && persist) verifyRefreshToken()
    }
    // CLEANUP FUNCTION ---------------------
    return () => (effectRan.current = true)

    // eslint-disable-next-line
  }, [])

  let content
  // IF NO PERSIST ------
  if (!persist) {
    // persist: no
    // console.log('no persist')
    content = <Outlet />

    // IF LOADING ---------
  } else if (isLoading) {
    //persist: yes, token: no
    // console.log('loading')
    content = <p>Loading...</p>

    // IF ERROR ---------- LOGIN AGAIN
  } else if (isError) {
    //persist: yes, token: no
    // console.log('error')
    content = (
      <p className="border-4 p-2">
        {`${error.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    )

    // IF SUCCESS --------
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // console.log('success')
    content = <Outlet />

    // IF SUCCESS BUT NO INITIALIZED ------
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log('token and uninit')
    // console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}
export default PersistLogin
