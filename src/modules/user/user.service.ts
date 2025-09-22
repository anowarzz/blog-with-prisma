import { prisma } from "../../config/db";

const createUser = async (payload: any) => {
  const createdUser = await prisma.user.create({
    data: payload,
  });

  return createdUser;
};

export const UserService = {
  createUser,
};
