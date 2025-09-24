import {} from "@prisma/client";
import { prisma } from "../../config/db";
import { Post, Prisma } from "../../generated/prisma";

// create post
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

// get all posts
const getAllPosts = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
}): Promise<{
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      tags && tags?.length > 0 && { tags: { hasEvery: tags } },
      typeof isFeatured === "boolean" && { isFeatured },
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      createdAt: "desc",
    },

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

  const total = await prisma.post.count({ where });

  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// get single post by id
const getPostById = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return await tx.post.findUnique({
      where: { id },

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
  });
};

// update post
const updatePost = async (
  id: number,
  payload: Prisma.PostUpdateInput
): Promise<Post> => {
  const result = await prisma.post.update({
    where: { id },
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

// delete post
const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: { id },
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

// get blog stats
const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregate = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: {
        isFeatured: true,
      },
      orderBy: { views: "desc" },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekPostCount = await tx.post.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return {
      stats: {
        totalPosts: aggregate._count ?? 0,
        totalViews: aggregate._sum.views ?? 0,
        avgViews: aggregate._avg.views ?? 0,
        maxViews: aggregate._max.views ?? 0,
        minViews: aggregate._min.views ?? 0,
      },
      featured: {
        count: featuredCount,
        topPost: topFeatured,
      },
      lastWeekPostCount,
    };
  });
};

export const PostService = {
  createPost,
  getBlogStat,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
