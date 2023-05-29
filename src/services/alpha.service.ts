import { Alpha } from "../entities/alpha.entity";

/**
 * Guarda el JSON desordenado en la base de datos y lo devuelve ordenado alfabéticamente.
 * @param {any} item - El JSON desordenado a guardar.
 * @returns El JSON ordenado alfabéticamente.
 * @throws {Error} - Si ocurre un error al guardar el JSON desordenado.
 */

export const saveDisorderedJson = async (item: any) => {
  try {
    const alpha = new Alpha();
    alpha.json = item;
    await alpha.save();

    const sortedJson: any = {};
    Object.keys(item) // Ordenamos alfabéticamente.
      .sort()
      .forEach((key) => {
        sortedJson[key] = item[key];
      });

    return sortedJson; // Retornamos el JSON ordenado.
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error("Error al guardar el JSON desordenado");
  }
};
