import { useState } from 'react'
import { Link } from 'react-router-dom'
import panther from '../../public/assets/panther.png'
import { TiThMenu } from 'react-icons/ti'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Register', path: '/new' },
  { name: 'Login', path: '/login' },
]

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false)
  //
  const toggleMenu = () => {
    setDisplayMenu(!displayMenu)
  }
  return (
    <nav className="text-white m-0 pl-3 py-3 flex justify-around items-center w-[100%] bg-black">
      {/* // LOGO ----------------------------------------- */}
      <div className="flex items-center gap-2 w-[50%]">
        <img
          className="h-[80%] w-[35%] max-h-[140px] max-w-[100px] z-10"
          src={panther}
        ></img>
        <p className="text-md md:text-3xl font-black text-white ml-2 z-10">
          SHOTIME
        </p>
      </div>
      {/* // MENU ----------------------------------------- */}
      <div
        className={`absolute right-0 flex justify-center items-center px-5 min-h-[60vh] w-full md:static md:min-h-fit md:w-auto ${
          displayMenu ? 'top-[0%] bg-black/90' : 'top-[-100%] bg-transparent'
        } transition-all duration-500 w-[50%]`}
      >
        <div className="flex flex-col gap-8 justify-right items-center md:flex-row md:gap-[4vw] w-[100%]">
          {links.map((item, i) => {
            return (
              <Link
                className="flex justify-center text-lg md:text-lg border-2 border-transparent p-1 rounded-md hover:border-orange-500 transition-all w-[50%]"
                key={i}
                to={item.path}
                onClick={() => setDisplayMenu(false)}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
      {/* // BUTTON ----------------------------------------- */}
      <div className="p-2 flex gap-8 items-center">
        {/* <button className="bg-orange-400 p-1 rounded">Button</button> */}
        <TiThMenu
          onClick={toggleMenu}
          className="text-xl cursor-pointer md:hidden z-10"
        />
      </div>
    </nav>
  )
}

export default Navbar

// {/* <div className="flex justify-between items-center bg-black shadow-md shadow-gray-600 px-10 py-2 w-[100%]">
//       {/* // LOGO ----------------------------------------- */}
//       <div className="flex gap-2 justify-center items-center border-2 border-red-200 w-[30%]">
//         <img
//           className="h-[80%] w-[35%] max-h-[140px] max-w-[100px]"
//           src={panther}
//         ></img>
//         <p className="text-md md:text-3xl font-black text-white ml-2">
//           SHOTIME
//         </p>
//       </div>
//       {/* // MENU ----------------------------------------- */}
//       <div
//         className={`absolute left-0 flex justify-center items-center px-5 h-[15%] w-full md:static md:min-h-fit md:w-auto ${
//           displayMenu ? 'top-[5%] bg-black' : 'top-[-100%] bg-transparent'
//         } transition-all duration-500`}
//       >

//         <div className="flex flex-col gap-8 md:flex-row md:justify-center md:items-center md:gap-[4vw] w-[100%]">
//           {links.map((item, i) => {
//             return (
//               <Link
//                 className="text-xs md:text-lg border-2 border-transparent p-1 rounded-md hover:border-orange-500 transition-all"
//                 key={i}
//                 to={item.path}
//               >
//                 {item.name}
//               </Link>
//             )
//           })}
//         </div>
//         {/* // BUTTON ----------------------------------------- */}
//         <div className="p-2 flex gap-8 items-center">
//           <TiThMenu
//             onClick={toggleMenu}
//             className="text-orange-500 text-xl cursor-pointer visible md:hidden"
//           />
//         </div>
//       </div>
//     </div> */}
