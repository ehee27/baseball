import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/dash/DashLayout'
import Welcome from './features/auth/Welcome'
import MessageList from './features/messages/MessageList'
import UserList from './features/users/UserList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* --------------- DASH ----------------- */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          {/* --------------- MESSAGES ----------------- */}
          <Route path="messages">
            <Route index element={<MessageList />} />
          </Route>
          {/* --------------- USERS ----------------- */}
          <Route path="users">
            <Route index element={<UserList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
