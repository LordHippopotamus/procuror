import Layout from "./_components/Layout";
import UsersList from "./_components/UsersList";
import CreateUserForm from "./_components/CreateUserForm";

const Users = () => {
  return (
    <Layout>
      <CreateUserForm />
      <UsersList />
    </Layout>
  );
};

export default Users;
