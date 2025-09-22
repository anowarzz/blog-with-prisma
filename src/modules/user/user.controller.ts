import { Request, Response } from "express";
import { UserService } from "./user.service";

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    console.log("console from controller");
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get user by id
const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await UserService.getUserById(id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await UserService.updateUser(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await UserService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
