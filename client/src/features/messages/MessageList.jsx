import { useGetMessagesQuery } from './messagesApiSlice'
import MessageCard from './MessageCard'
import Loading from '../../components/Loading'

const MessagesList = () => {
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
    content = <p className="errmsg">{error?.data?.message}</p>
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
        {messagesContent}
      </div>
    )
  }

  return content
}
export default MessagesList
