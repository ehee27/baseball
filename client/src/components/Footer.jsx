import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const DashFooter = () => {
  return (
    <div className="sticky footer inset-x-0 bottom-0 flex flex-col gap-2 bg-gray-500 text-white py-2 px-5">
      <Link to="/">
        <p className="font-sans">FOOTER</p>
      </Link>
      <Link to="/">HOME</Link>
    </div>
  )
}

export default DashFooter
