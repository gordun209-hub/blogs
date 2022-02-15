import { createSlice } from '@reduxjs/toolkit'
import usersService from '../../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initUsers: (state, action) => {
      return action.payload
    },
    currentUser: (state, action) => {
      return state.map(user => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          }
        }
        return user
      })
    },
  },
})
export const initializeUsers = () => async dispatch => {
  const users = await usersService.getAll()
  dispatch(usersSlice.actions.initUsers(users))
}
export default usersSlice.reducer
export const { initUsers, currentUser } = usersSlice.actions