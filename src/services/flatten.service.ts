import { Flatten } from "../entities/flatten.entity";

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
