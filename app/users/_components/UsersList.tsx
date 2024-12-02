"use server";

import { prisma } from "@/prisma";

const UsersList = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  });

  return (
    <ul>
      {users.map((el) => (
        <li key={el.id}>{el.email}</li>
      ))}
    </ul>
  );
};

export default UsersList;
