import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware para registrar solicitudes en la consola durante el desarrollo.
app.use(morgan("dev"));

// Middleware para permitir solicitudes de diferentes dominios.
app.use(cors());

// Middleware para analizar solicitudes con formato JSON.
app.use(express.json());

export default app;
