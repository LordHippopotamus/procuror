import { createUser } from "./actions";

const Users = () => {
  return (
    <form action={createUser}>
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <button>create user</button>
    </form>
  );
};

export default Users;
