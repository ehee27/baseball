import { useGetUsersQuery } from './usersApiSlice'
import UserCard from './UserCard'
import Loading from '../../components/Loading'

const UsersList = () => {
  //
  // GET USERS MUTATION -------------------
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  // DEFINE CONTENT VARIABLE -----------------------
  let content
  if (isLoading) content = <Loading />
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }
  // IF SUCCESSFUL - destruct the id's array from 'users' results
  if (isSuccess) {
    const { ids } = users

    // DEFINE usersContent
    // *** mapping the array and initializing cards by passing id
    const usersContent =
      ids?.length &&
      ids.map(userId => <UserCard key={userId} userId={userId} />)

    content = (
      <div
        className={`bg-center bg-cover bg-[url(../../../public/assets/lockerroom.webp)] min-h-screen`}
      >
        <div className="flex gap-2 flex-col bg-black bg-opacity-80 min-h-screen p-10">
          <p>PLAYERS</p>
          <div className="grid grid-cols-1 gap-2">{usersContent}</div>
        </div>
      </div>
    )
  }

  return content
}
export default UsersList
