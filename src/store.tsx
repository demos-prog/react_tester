import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/users/usersSlice'
import counterReducer from './features/counter/counterSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    counter: counterReducer
  },
})