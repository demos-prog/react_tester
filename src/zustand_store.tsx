import { create } from 'zustand'

export type User = {
  name: string,
  age: number
}

export const useUsersStore = create((set) => ({
  users: [] as User[],
  addUser: (newUser: User) => set((state: any) => ({ users: [...state.users, newUser] })),
  removeUser: (index: number) => set((state: any) => ({ users: state.users.filter((_: User, i: number) => i !== index) })),
}))