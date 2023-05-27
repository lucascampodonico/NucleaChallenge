import { Request, Response } from "express";
import { saveDisorderedJson } from "../services/alpha.service";

export const alphabetize = async (req: Request, res: Response) => {
  try {
    // Verificamos que se envie solo JSON.
    if (req.is("application/json")) {
      const responseJson = await saveDisorderedJson(req.body); //Guardamos en db y ordenamos.
      return res.json(responseJson); //Retornamos el json ordenado.
    } else {
      return res.status(400).json({ error: "Se esperaba un JSON válido" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
