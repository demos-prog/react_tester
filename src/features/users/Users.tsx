import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addUser, removeUser, User } from './usersSlice'


const Users: React.FC = () => {
  const users = useSelector((state: any) => state.users.users)
  const dispatch = useDispatch()

  const name_input_ref = useRef<HTMLInputElement>(null);
  const age_input_ref = useRef<HTMLInputElement>(null);

  function handle_submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (name_input_ref.current && age_input_ref.current) {
      const newUser: User = {
        name: name_input_ref.current.value,
        age: parseInt(age_input_ref.current.value)
      }
      dispatch(addUser(newUser))
      name_input_ref.current.value = ''
      age_input_ref.current.value = ''
    }
  }

  return (
    <>
      <form onSubmit={handle_submit}>
        <input ref={name_input_ref} type="text" placeholder="Enter name" />
        <input ref={age_input_ref} type="number" placeholder="Enter age" />
        <button type="submit">Add user</button>
      </form>
      <ul>
        {users.length > 0 && users.map((user: User, index: number) => (
          <li key={index}>
            {user.name} - {user.age}
            <button onClick={() => dispatch(removeUser(user))}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
