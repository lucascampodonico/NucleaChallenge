import { Request, Response } from "express";
import { getAllQuotes, saveQuote } from "../services/quotes.service";

/**
 * Genera una nueva cita y la guarda en la base de datos.
 * @returns La cita generada en la respuesta HTTP o un mensaje de error.
 */

export const generateQuote = async (req: Request, res: Response) => {
  try {
    const responseQuote = await saveQuote(); //Guardamos la cita.
    return res.json(responseQuote); //Retornamos la misma.
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todas las citas almacenadas en la base de datos.
 * @returns Todas las citas en la respuesta HTTP o un mensaje de error.
 */

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const responseQuotes = await getAllQuotes();
    return res.json(responseQuotes); //Retornamos todas las citas
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las citas" });
  }
};
