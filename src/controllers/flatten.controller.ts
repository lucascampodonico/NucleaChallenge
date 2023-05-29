import { Request, Response } from "express";
import { saveUnflattendJson } from "../services/flatten.service";

/**
 * Aplana un JSON enviado en la solicitud y lo guarda en la base de datos.
 * @returns El JSON aplanado en la respuesta HTTP o un mensaje de error.
 */

export const flatten = async (req: Request, res: Response) => {
  try {
    // Verificamos que se envie solo JSON.
    if (req.is("application/json")) {
      const flattened = await saveUnflattendJson(req.body); //Guardamos el request JSON en DB y aplanamos.
      return res.json(flattened); //Retormamos el JSON aplanado.
    } else {
      return res.status(400).json({ error: "Se esperaba un JSON válido" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
