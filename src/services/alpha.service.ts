import { Alpha } from "../entities/alpha.entity";

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
