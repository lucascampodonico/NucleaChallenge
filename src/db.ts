// Configuración de la fuente de datos de la base de datos
// Este archivo establece la conexión con la base de datos y define las entidades utilizadas.

import "dotenv/config";
import { DataSource } from "typeorm";
import { Alpha } from "./entities/alpha.entity";
import { Flatten } from "./entities/flatten.entity";
import { Quote } from "./entities/quote.entity";

// Obtener la configuración de la base de datos desde las variables de entorno
const DB_HOST = process.env.DB_HOST || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_PORT = process.env.DB_PORT || "5432";

// Configurar y exportar la fuente de datos de la aplicación
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(DB_PORT),
  entities: [Alpha, Flatten, Quote],
  logging: true,
  synchronize: true,
});
