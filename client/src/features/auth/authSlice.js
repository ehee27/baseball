import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  // OUR INITIAL STATE is an object with TOKEN key/property
  // * value starts as null
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      // DESTRCUT the accessToken from payload and set state
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: (state, action) => {
      // REVERT TO null
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = state => state.auth.token
