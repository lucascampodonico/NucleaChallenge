import "reflect-metadata";
import "dotenv/config";
import { join } from "path";
import app from "./app";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./db";
import { setupSwagger, swaggerSpec } from "./docs/swagger";
import indexRoutes from "./routes/index.routes";
import alphaRoutes from "./routes/alpha.routes";
import flattenRoutes from "./routes/flatten.routes";
import quoteRoutes from "./routes/quotes.routes";
import {
  error404,
  validarJSON,
  otherError,
} from "./middlewares/errorExceptions";

const PORT = process.env.PORT || 8080;

export async function main() {
  try {
    await AppDataSource.initialize();

    // Configuración de vistas y motor de plantillas
    app.set("views", join(__dirname, "views"));
    app.set("view engine", "ejs");

    setupSwagger(app);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Rutas del servidor
    app.use(indexRoutes);
    app.use(alphaRoutes);
    app.use(flattenRoutes);
    app.use(quoteRoutes);

    // Middleware para manejar el error 404.
    app.use(error404);
    // Middleware para manejar error de sintaxis.
    app.use(validarJSON);
    // Middleware para manejar otros errores.
    app.use(otherError);

    app.listen(PORT, () => console.log("Server is listening on port ", PORT));
  } catch (error) {
    console.error(error);
  }
}
main();
