import app from "./app";
import dotenv from "dotenv";
import consola from "consola";

dotenv.config();

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, () => {
    consola.success(`Server running at PORT: ${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
