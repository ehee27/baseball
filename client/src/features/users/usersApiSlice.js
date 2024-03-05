import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

//-----------------------------------------------------
const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //
    // GET ALL USERS -----------------------
    getUsers: builder.query({
      query: () => '/api/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedUsers = responseData.map(user => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id })),
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      },
    }),

    // ADD NEW USER -----------------------
    addNewUser: builder.mutation({
      query: newUserData => ({
        url: '/api/users',
        method: 'POST',
        body: {
          ...newUserData,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    // UPDATE USER -------------------------
    updateUser: builder.mutation({
      query: dataToUpdate => ({
        url: '/api/users',
        method: 'PATCH',
        body: {
          ...dataToUpdate,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),

    // DELETE USER --------------------------
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: '/api/users',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),

    // UPLOAD PIC --------------------------
    uploadPic: builder.mutation({
      query: imageFile => ({
        url: '/api/users/upload',
        method: 'POST',
        body: imageFile,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadPicMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
