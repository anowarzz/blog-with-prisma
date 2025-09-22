import { Request, Response } from "express";
import { PostService } from "./post.service";

// create Post
const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all posts
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;

    const result = await PostService.getAllPosts({ page, limit, search, isFeatured });
    res.status(200).json(result);
   } catch (error) {
    res.status(500).send(error);
  }
};

// get post by id
const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await PostService.getPostById(parseInt(id));
    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update post
const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await PostService.updatePost(parseInt(id), req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// delete post
const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await PostService.deletePost(parseInt(id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
