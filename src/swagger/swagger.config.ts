import {SwaggerOptions} from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentation des endpoints de l'API",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Serveur de développement",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
