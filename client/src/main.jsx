import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Home from './pages/Home.jsx'
import TwoColumn from './pages/TwoColumn.jsx'
import ThreeColumn from './pages/ThreeColumn.jsx'
import SingleColumn from './pages/SingleColumn.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />}></Route>
      <Route path="/single-column" element={<SingleColumn />}></Route>
      <Route path="/two-column" element={<TwoColumn />}></Route>
      <Route path="/three-column" element={<ThreeColumn />}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
)
