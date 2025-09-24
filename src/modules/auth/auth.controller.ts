import { Request, Response } from "express";
import { AuthService } from "./auth.service";

// login
const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginWithEmailAndPassword(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// auth with google
const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.authWithGoogle(req.body);
   
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const AuthController = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
