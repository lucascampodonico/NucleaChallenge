import { Express } from "express";
import swaggerJSDoc, {
  OAS3Definition,
  OAS3Options,
  SwaggerDefinition,
} from "swagger-jsdoc";
import { quoteSchema, quotesSchema } from "./schemas/quote.schema";
import { alphaSchema } from "./schemas/alpha.schema";
import { flattenSchema } from "./schemas/flatten.schema";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for your Express application",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Quote: quoteSchema,
      Quotes: quotesSchema,
      Alpha: alphaSchema,
      Fatten: flattenSchema,
    },
  },
};

const options: OAS3Options = {
  swaggerDefinition,
  apis: ["src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
