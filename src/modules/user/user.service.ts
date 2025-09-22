import { prisma } from "../../config/db";
import { Prisma, User } from "../../generated/prisma";

// create a user
const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });

  return createdUser;
};

// Get all user
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      status: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      posts: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

// get user by id
const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      status: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      posts: true,
    },
  });
  return user;
};

// update user
const updateUser = async (id: number, payload: Prisma.UserUpdateInput) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      status: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      posts: true,
    },
  });
  return updatedUser;
};

// delete user
const deleteUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      status: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      posts: true,
    },
  });
  return deletedUser;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
