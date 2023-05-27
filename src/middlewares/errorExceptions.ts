import { Request, Response, NextFunction } from "express";

export const error404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint Not found" });
};

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

export const otherError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};
