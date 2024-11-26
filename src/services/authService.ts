import PrismaSingleton from "../config/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = PrismaSingleton.getInstance();
const JWT_SECRET = process.env["JWT_SECRET"];

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const registerUser = async (email: string, password: string, name: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    // Génère un token pour l'utilisateur nouvellement inscrit
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    // Génère un token pour l'utilisateur connecté
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
};
