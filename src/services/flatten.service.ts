import { Flatten } from "../entities/flatten.entity";

/**
 * Guarda el JSON sin aplanar en la base de datos y devuelve el JSON aplanado.
 * @param {any} item - El JSON sin aplanar a guardar.
 * @returns El JSON aplanado.
 * @throws {Error} - Si ocurre un error al guardar el JSON aplanado.
 */
export const saveUnflattendJson = async (item: any) => {
  try {
    const flatten = item;

    const unflattened = new Flatten();
    unflattened.json = item;
    await unflattened.save();

    for (let key in flatten) {
      // Aplanamos los Array en el JSON.
      if (Array.isArray(flatten[key])) {
        flatten[key] = flatten[key].join(",");
      }
    }
    return flatten;
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error("Error al guardar el JSON aplanado");
  }
};
