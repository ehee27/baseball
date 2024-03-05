import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/dash/DashLayout'
import Welcome from './features/auth/Welcome'
import MessageList from './features/messages/MessageList'
import UserList from './features/users/UserList'
import NewUserForm from './features/users/NewUserForm'
import UserProfile from './features/users/profile/UserProfile'
import UserDetails from './features/users/UserDetails'
// import UserCard from './features/users/UserCard'
import NewMessage from './features/messages/NewMessage'
import EditMessage from './features/messages/edit/EditMessage'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import { StatsContextProvider } from './context/StatsContext'
import Players from './components/Players'

function App() {
  return (
    <StatsContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* -------- public routes ------------- */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="new" element={<NewUserForm />} />
          <Route path="players" element={<Players />} />
          {/* ------------ DASH + PROTECTED ROUTES ----------- */}

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                {/* -------------- */}
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />

                  {/* --------------- MESSAGES ----------------- */}
                  <Route path="messages">
                    <Route index element={<MessageList />} />
                    <Route path="new" element={<NewMessage />} />
                    <Route path=":id" element={<EditMessage />} />
                  </Route>

                  {/* --------------- USERS ----------------- */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.Player, ROLES.Coach]} />
                    }
                  >
                    <Route path="users">
                      <Route index element={<UserList />} />

                      <Route path="profile" element={<UserProfile />} />
                      <Route path=":id" element={<UserDetails />} />
                    </Route>
                  </Route>
                  {/* ------ */}
                </Route>

                {/* END DASH */}
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </StatsContextProvider>
  )
}

export default App
