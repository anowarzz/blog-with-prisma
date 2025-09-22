import {} from "@prisma/client";
import { prisma } from "../../config/db";
import { Post, Prisma } from "../../generated/prisma";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return result;
};

export const PostService = {
  createPost,
};
