import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({message: "Authorization token missing or invalid"});
        return; // Assure que le middleware s'arrête ici
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as { id: number; email: string };
        next();
        return;
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"});
        return; // Assure que la fonction retourne une valeur ici aussi
    }
};
