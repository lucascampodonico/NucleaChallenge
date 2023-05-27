import { Quote } from "../entities/quote.entity";
import { fetch } from "undici";
import "dotenv/config";

const apiKey = process.env.API_KEY || "";

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

      return quote; // Retornamos la cita.
    } else {
      throw new Error('La respuesta de la API no tiene una cita válida');
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error('Error al guardar la cita');
  }
};

export const getAllQuotes = async () => {
  try {
    const quotes = await Quote.find();
    const quotesByAuthor = quotes.reduce((result: any, item) => {
      const { author, id, quote, consultation_date } = item;
      if (!(author in result)) {
        result[author] = [];
      }
      result[author].push({ id, quote, consultation_date });
      return result;
    }, {});

    const sortedAuthors: any = {};
    Object.keys(quotesByAuthor)
      .sort()
      .forEach((author) => {
        const sortedQuotes = quotesByAuthor[author].sort(
          (a: { consultation_date: Date }, b: { consultation_date: Date }) => {
            const dateA = new Date(a.consultation_date);
            const dateB = new Date(b.consultation_date);
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
