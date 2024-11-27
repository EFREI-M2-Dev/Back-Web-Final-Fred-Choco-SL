import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name, surname } = req.body;
        const { user, token } = await registerUser(email, password, name, surname);
        res.status(201).json({ message: "User registered", user, token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ message: "User logged in", user, token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};
