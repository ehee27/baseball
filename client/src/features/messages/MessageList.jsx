import { useGetMessagesQuery } from './messagesApiSlice'
import MessageCard from './MessageCard'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const MessagesList = () => {
  const { username, isPlayer, isCoach, id } = useAuth()
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
  if (isLoading) content = <p>Loading...</p>
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
        messageId => entities[messageId].user === id
      )
    }

    const messagesContent =
      ids?.length &&
      filteredMessagesByID.map(messageId => (
        <MessageCard key={messageId} messageId={messageId} />
      ))

    content = <div className="bg-zinc-500">{messagesContent}</div>
  }

  return content
}
export default MessagesList
