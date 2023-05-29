import { Express } from "express";
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import { quoteSchema, quotesSchema } from "./schemas/quote.schema";
import { alphaSchema } from "./schemas/alpha.schema";
import { flattenSchema } from "./schemas/flatten.schema";

// Definición de Swagger con información general y esquemas.
const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Nuclea Challenge - Documentation",
    version: "1.0.0",
    description: "API documentation for Nuclea Project",
  },
  components: {
    schemas: {
      Quote: quoteSchema, // Esquema para una cita
      Quotes: quotesSchema, // Esquema para múltiples citas
      Alpha: alphaSchema, // Esquema para el objeto Alpha
      Flatten: flattenSchema, // Esquema para el objeto Flatten
    },
  },
};

const options: OAS3Options = {
  swaggerDefinition,
  apis: ["src/routes/*.ts"], // Rutas donde se definen los endpoints
};

// Genera el objeto de especificación Swagger.
export const swaggerSpec = swaggerJSDoc(options);

/**
 * Configura Swagger para la aplicación Express.
 * @param app La instancia de la aplicación Express a la cual se agregará Swagger.
 */
export const setupSwagger = (app: Express) => {
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
