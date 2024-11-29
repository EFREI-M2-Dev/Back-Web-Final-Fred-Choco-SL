import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Application } from "express";
import { swaggerOptions } from "./swagger.config";

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const useSwagger = (app: Application): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log("📄 Swagger documentation disponible sur /api-docs");
};
