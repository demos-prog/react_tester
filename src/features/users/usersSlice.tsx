import { createSlice } from '@reduxjs/toolkit'

export type User = {
  name: string,
  age: number
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action) => {
      const index = state.users.findIndex(user => user.name === action.payload.name)
      if (index !== -1) {
        state.users.splice(index, 1)
      }
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.name === action.payload.name)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
  },
})

export const { addUser, removeUser, updateUser } = usersSlice.actions

export default usersSlice.reducer
