import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPosts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

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

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await PostService.updatePost(parseInt(id), req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

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
