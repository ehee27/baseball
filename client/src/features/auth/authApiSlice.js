import { apiSlice } from '../../app/api/apiSlice'
import { logOut, setCredentials } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //
    // LOGIN -----------------------
    // sending 'creds' (user, pass) to /auth
    login: builder.mutation({
      query: credentials => ({
        url: '/api/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    // LOGOUT -----------------------
    // we're calling dispatch(logout())
    sendLogout: builder.mutation({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled
          //console.log(data)
          dispatch(logOut())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
          // CLEARS THE CACHE AND QUERY SUBSCRIPTIONS
          // dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/api/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // console.log(data)
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    // REFRESH -----------------------
    // refresh: builder.mutation({
    //   query: () => ({
    //     url: '/api/auth/refresh',
    //     method: 'GET',
    //   }),
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled
    //       console.log('This is the data/token', data)
    //       const { accessToken } = data
    //       // SET CREDENTIALS
    //       dispatch(setCredentials({ accessToken }))
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   },
    // }),
  }),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice
