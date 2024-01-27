import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// import Home from './pages/Home.jsx'
// import TwoColumn from './pages/TwoColumn.jsx'
// import ThreeColumn from './pages/ThreeColumn.jsx'
// import SingleColumn from './pages/SingleColumn.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route index={true} path="/" element={<Home />}></Route>
//       <Route path="/single-column" element={<SingleColumn />}></Route>
//       <Route path="/two-column" element={<TwoColumn />}></Route>
//       <Route path="/three-column" element={<ThreeColumn />}></Route>
//     </Route>
//   )
// )
