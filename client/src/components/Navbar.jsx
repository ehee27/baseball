import { Link } from 'react-router-dom'
import logo from '../../public/assets/minor-league-baseball-6-logo-png-transparent.png'

const links = [
  { name: 'Home', path: '/' },
  // { name: 'Dash', path: '/dash' },
  { name: 'Register', path: '/dash/users/new' },
  { name: 'Message', path: '/dash/messages/new' },
  // { name: 'Mixed', path: '/mixed' },
]

const Navbar = () => {
  return (
    <div className="flex justify-center bg-zinc-700 shadow-md shadow-gray-400 px-10">
      <div className="flex justify-start items-center w-[50%]">
        <img
          className="h-[80%] w-[40%] max-h-[140px] max-w-[140px]"
          src={logo}
        ></img>
        <p className="text-md md:text-3xl font-black text-white">SHOTIME</p>
      </div>
      <div className="flex justify-end items-center gap-4 w-[50%] text-white">
        {links.map((item, i) => {
          return (
            <Link className="text-xs md:text-lg" key={i} to={item.path}>
              {item.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
