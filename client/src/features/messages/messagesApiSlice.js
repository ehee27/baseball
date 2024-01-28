import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const messagesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
})

const initialState = messagesAdapter.getInitialState()

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/api/messages',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedMessages = responseData.map(message => {
          message.id = message._id
          return message
        })
        return messagesAdapter.setAll(initialState, loadedMessages)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Message', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Message', id })),
          ]
        } else return [{ type: 'Message', id: 'LIST' }]
      },
    }),
  }),
})

export const { useGetMessagesQuery } = messagesApiSlice

// returns the query result object
export const selectMessagesResult =
  messagesApiSlice.endpoints.getMessages.select()

// creates memoized selector
const selectMessagesData = createSelector(
  selectMessagesResult,
  messagesResult => messagesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  // Pass in a selector that returns the messages slice of state
} = messagesAdapter.getSelectors(
  state => selectMessagesData(state) ?? initialState
)
