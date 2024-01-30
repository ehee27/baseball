import { useGetUsersQuery } from './usersApiSlice'
import UserCard from './UserCard'
import Loading from '../../components/Loading'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery()

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const usersContent = ids?.length
      ? ids.map(userId => <UserCard key={userId} userId={userId} />)
      : null

    content = (
      <div className="p-3">
        <p>These are the users</p>
        {usersContent}
      </div>
    )
  }

  return content
}
export default UsersList
