import { useGetMessagesQuery } from './messagesApiSlice'
import MessageCard from './MessageCard'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const MessagesList = () => {
  const navigate = useNavigate()
  //
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery()

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = messages

    const messagesContent = ids?.length
      ? ids.map(messageId => (
          <MessageCard key={messageId} messageId={messageId} />
        ))
      : null

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
