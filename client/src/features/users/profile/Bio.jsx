import useAuth from '../../../hooks/useAuth'
const Bio = () => {
  const { bio } = useAuth()
  return (
    <div className="col-span-2 text-md md:text-lg rounded p-5 flex items-center text-zinc-600">
      {bio}
    </div>
  )
}

export default Bio
