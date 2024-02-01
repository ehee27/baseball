import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  //
  // use getState to check the auth.token state
  // if token... set an 'authorization' HEADER WITH THE TOKEN
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log('ARGS', args) // request url, method, body
  // console.log('API', api) // signal, dispatch, getState()
  // console.log('ExtraOptions', extraOptions) //custom like {shout: true}

  // THIS IS THE INITIAL ACCESS TOKEN FROM baseQuery
  let result = await baseQuery(args, api, extraOptions)

  // if error, meaning expired - TRIGGER THE REFRESH
  if (result?.error?.status === 403) {
    console.log('sending refresh token')

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    // CHECK FOR RESULT DATA
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // RETRY QUERY WITH NEW TOKEN
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.'
      }
      return refreshResult
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Message', 'User'],
  endpoints: builder => ({}),
})
