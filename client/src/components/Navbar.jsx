import { Link } from 'react-router-dom'
import panther from '../../public/assets/panther.png'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Register', path: '/new' },
  { name: 'Login', path: '/login' },
]

const Navbar = () => {
  return (
    <div className="navbar bg-black/85 shadow-md shadow-gray-600 px-10 py-4">
      <div className="flex-1">
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <img
          className="h-[80%] w-[35%] max-h-[140px] max-w-[100px]"
          src={panther}
        ></img>
        <p className="text-md md:text-3xl font-black text-white ml-2">
          SHOTIME
        </p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="text-white">Menu</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                {links.map((item, i) => {
                  return (
                    <li key={i}>
                      <Link
                        className="text-xs md:text-lg border-2 border-transparent p-1 rounded-md hover:border-orange-500 text-white transition-all"
                        to={item.path}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>

    // <div className="flex justify-center bg-black shadow-md shadow-gray-600 px-10 py-2">
    //   <div className="flex justify-start items-center w-[50%]">
    //     <img
    //       className="h-[80%] w-[35%] max-h-[140px] max-w-[100px]"
    //       src={panther}
    //     ></img>
    //     <p className="text-md md:text-3xl font-black text-white ml-2">
    //       SHOTIME
    //     </p>
    //   </div>
    //   <div className="flex justify-end items-center gap-4 w-[50%] text-white">
    //     {links.map((item, i) => {
    //       return (
    //         <Link
    //           className="text-xs md:text-lg border-2 border-transparent p-1 rounded-md hover:border-orange-500 transition-all"
    //           key={i}
    //           to={item.path}
    //         >
    //           {item.name}
    //         </Link>
    //       )
    //     })}
    //   </div>
    // </div>
  )
}

export default Navbar
