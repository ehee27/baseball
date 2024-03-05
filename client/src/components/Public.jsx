import { Link } from 'react-router-dom'
import Loading from './Loading'
import Logos from './Logos'
import DashHeader from './dash/DashHeader'
import useAuth from '../hooks/useAuth'

const buttons = [
  { label: 'PLAYERS', link: '/players' },
  { label: 'COACHES', link: '/players' },
]

const Public = () => {
  const { id } = useAuth()
  //
  return (
    <>
      {id && <DashHeader />}
      <div className="h-[100vh]">
        {/* ------------------- OUTER DIV - bg image ------------------------ */}

        <div
          className={`bg-center bg-cover bg-[url(../../../../public/assets/CWS.png)] h-[100%]`}
        >
          {/* ----------------- BANNER CONTENT ----------------------- */}
          <div className="bg-black/70 h-[100%] py-2 px-5 md:py-10 md:px-20">
            <div className="p-2 md:p-5 text-white">
              <h1 className="text-2xl md:text-4xl font-black p-5 text-center">
                Welcome to the SHO
              </h1>
              <div className="flex flex-col gap-4 text-left text-md md:text-lg my-4 bg-black/40 p-5 rounded">
                <p>
                  Getting recruited to play college baseball is no easy task.
                  High school student-athletes must put in a lot of hard work to
                  keep up their grades and continue to improve their game, but
                  that's just the beginning. Many student-athletes believe, “If
                  I’m good enough, coaches will find me, and I’ll get
                  recruited.”{' '}
                </p>
                <p>
                  The reality is that student-athletes need to be just as
                  engaged with their college baseball recruiting process as they
                  are dedicated to mastering their skills on the field.
                </p>{' '}
                <p>
                  Our focus is to help young prospects get more exposure and
                  connect with college coaches and scouts.
                </p>
              </div>
            </div>
            {/* --------------------- BUTTONS --------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 p-5 bg-black/70 shadow-md shadow-black">
              {buttons.map((item, i) => (
                <>
                  <Link
                    className="flex justify-center items-center w-[100%] my-2"
                    to={`${item.link}`}
                    key={i}
                  >
                    <button className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[80%] hover:scale-105 transition-all">
                      {item.label}
                    </button>
                  </Link>
                </>
              ))}
            </div>
            {/* --------------------- LOGOS --------------------------- */}
            <div className="p-5 bg-black/30 py-10">
              <Logos />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Public
