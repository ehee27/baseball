import { useGetMessagesQuery } from './messagesApiSlice'
import MessageCard from './MessageCard'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const MessagesList = () => {
  const navigate = useNavigate()
  const { username, isPlayer, isCoach } = useAuth()
  //
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery('messagesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content
  if (isLoading) content = <Loading />
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }
  // SUCCESS - BUILD THE CONTENT --------------------------
  if (isSuccess) {
    const { ids, entities } = messages

    // PLAYER OR COACH CAN VIEW ALL via IDs
    let filteredMessagesByID
    if (isPlayer || isCoach) {
      filteredMessagesByID = [...ids]
      // IF NOT PLAYER OR COACH FILTER BY USERNAME --------
    } else {
      filteredMessagesByID = ids.filter(
        messageId => entities[messageId].username === username
      )
    }

    const messagesContent =
      ids?.length &&
      filteredMessagesByID.map(messageId => (
        <MessageCard key={messageId} messageId={messageId} />
      ))
    // const messagesContent = ids?.length
    //   ? ids.map(messageId => (
    //       <MessageCard key={messageId} messageId={messageId} />
    //     ))
    //   : null

    content = (
      <div className="p-3">
        <p>These are the messages</p>
        <button
          onClick={() => navigate('/dash/messages/new')}
          className="btn btn-primary bg-gray-300 text-gray-600 p-3 rounded-md"
        >
          New
        </button>
        {messagesContent}
      </div>
    )
  }

  return content
}
export default MessagesList
