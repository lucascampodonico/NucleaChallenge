import { Quote } from "../entities/quote.entity";
import { fetch } from "undici";
import { format, parse } from "date-fns";

import "dotenv/config";

const apiKey = process.env.API_KEY || "";

/**
 * Guarda una cita obtenida de una API externa y devuelve la cita guardada.
 * @returns La cita guardada con fecha formateada.
 * @throws {Error} - Si ocurre un error al guardar la cita.
 */
export const saveQuote = async () => {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    const responseQuote = await response.json();

    if (Array.isArray(responseQuote) && responseQuote.length > 0) {
      const quote = new Quote();
      if (Array.isArray(responseQuote) && responseQuote.length > 0) {
        const item = responseQuote[0];
        quote.quote = item.quote;
        quote.author = item.author;
      }
      await quote.save();

      const quoteFormated = {
        author: quote.author,
        id: quote.id,
        quote: quote.quote,
        consultation_date: format(
          new Date(quote.consultation_date),
          "dd-MM-yyyy"
        ),
      };

      return quoteFormated; // Retornamos la cita con fecha formateada.
    } else {
      throw new Error("La respuesta de la API no tiene una cita válida");
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error("Error al guardar la cita");
  }
};

/**
 * Obtiene todas las citas guardadas y las organiza por autor y fecha de consulta.
 * @returns Las citas organizadas por autor y fecha.
 * @throws {Error} - Si ocurre un error al obtener las citas.
 */
export const getAllQuotes = async () => {
  try {
    const quotes = await Quote.find();
    const quotesByAuthor = quotes.reduce((result: any, item) => {
      const { author, id, quote, consultation_date } = item;
      if (!(author in result)) {
        result[author] = [];
      }
      result[author].push({
        id,
        quote,
        consultation_date: format(new Date(consultation_date), "dd-MM-yyyy"),
      });
      return result;
    }, {});

    const sortedAuthors: any = {};
    Object.keys(quotesByAuthor)
      .sort()
      .forEach((author) => {
        const sortedQuotes = quotesByAuthor[author].sort(
          (a: { consultation_date: string }, b: { consultation_date: string }) => {
            const datePartsA = a.consultation_date.split('-');
            const dateA = new Date(
              parseInt(datePartsA[2]), // año
              parseInt(datePartsA[1]) - 1, // mes (los meses en JavaScript son base 0)
              parseInt(datePartsA[0]) // día
            );
        
            const datePartsB = b.consultation_date.split('-');
            const dateB = new Date(
              parseInt(datePartsB[2]), // año
              parseInt(datePartsB[1]) - 1, // mes
              parseInt(datePartsB[0]) // día
            );
            return dateB.getTime() - dateA.getTime();
          }
        );

        sortedAuthors[author] = sortedQuotes;
      });

    return sortedAuthors;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las citas");
  }
};
