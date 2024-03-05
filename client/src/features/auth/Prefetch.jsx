import { store } from '../../app/store'
import { messagesApiSlice } from '../messages/messagesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    //
    // SUBSCRIBE TO MESSAGES
    const messages = store.dispatch(
      messagesApiSlice.endpoints.getMessages.initiate()
    )

    // SUBSCRIBE TO USERS
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      // console.log('unsubscribing')
      messages.unsubscribe()
      users.unsubscribe()
    }
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}
export default Prefetch
