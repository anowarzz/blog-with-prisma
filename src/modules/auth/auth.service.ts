import { prisma } from "../../config/db";
import { Prisma } from "./../../generated/prisma/index.d";

const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (password === user.password) {
    return user;
  } else {
    throw new Error("Password is Incorrect");
  }
};

// google log
const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }
};

export const AuthService = {
   loginWithEmailAndPassword,
   authWithGoogle
  
  };
