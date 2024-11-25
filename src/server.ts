import express, { Request, Response } from "express";
import dotenv from "dotenv";
import consola from "consola";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env["PORT"];

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

app.listen(PORT, () => {
    consola.success("Server running at PORT:", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});