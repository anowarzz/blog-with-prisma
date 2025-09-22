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

export const UserController = {
  createUser,
  getAllUsers,
};
