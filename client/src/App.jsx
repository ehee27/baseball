import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/dash/DashLayout'
import Welcome from './features/auth/Welcome'
import MessageList from './features/messages/MessageList'
import UserList from './features/users/UserList'
import NewUserForm from './features/users/NewUserForm'
// import EditUserForm from './features/users/EditUserForm'
import EditUser from './features/users/EditUser'
import NewMessage from './features/messages/NewMessage'
import EditMessage from './features/messages/EditMessage'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* --------------- DASH ----------------- */}
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
            {/* --------------- MESSAGES ----------------- */}
            <Route path="messages">
              <Route index element={<MessageList />} />
              <Route path="new" element={<NewMessage />} />
              <Route path=":id" element={<EditMessage />} />
            </Route>
            {/* --------------- USERS ----------------- */}
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path="new" element={<NewUserForm />} />
              <Route path="profile" element={<EditUser />} />
              <Route path=":id" element={<EditUser />} />
            </Route>
          </Route>
          {/* END DASH */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
