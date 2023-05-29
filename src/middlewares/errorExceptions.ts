import { Request, Response, NextFunction } from "express";

// Middleware para manejar errores 404 (Endpoint no encontrado)
export const error404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint Not found" });
};

// Middleware para validar si la solicitud contiene un JSON válido
export const validarJSON = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "JSON inválido" });
  } else {
    next();
  }
};

// Middleware para manejar otros errores no controlados
export const otherError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};
