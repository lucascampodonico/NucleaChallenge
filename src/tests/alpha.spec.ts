import supertest from "supertest";
import app from "../app";
import alphaRoutes from "../routes/alpha.routes";
import { AppDataSource } from "../db";
import { saveDisorderedJson } from "../services/alpha.service";
import { Alpha } from "../entities/alpha.entity";

// Configuración inicial antes de todas las pruebas
beforeAll(async () => {
  await AppDataSource.initialize();
  app.use(alphaRoutes);
});

// Limpieza después de todas las pruebas
afterAll(async () => {
  await AppDataSource.destroy();
});

// Limpieza después de cada prueba
afterEach(async () => {
  await new Promise((resolve) => setImmediate(resolve));
});

describe("PUT /alpha", () => {
  it("should return the sorted JSON object", async () => {
    // Preparación de datos de prueba
    const requestBody = {
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    };

    // Realizar la solicitud y realizar la comprobación
    const response = await supertest(app)
      .put("/alpha")
      .send(requestBody)
      .expect(200);

    const sortedJson = {
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
      fruit: "apple",
    };

    expect(response.body).toEqual(sortedJson);
  });

  it("should return 400 if the input is invalid", async () => {
    // Preparación de datos de prueba inválidos
    const requestBody = "invalid input";

    // Realizar la solicitud y realizar la comprobación
    const response = await supertest(app)
      .put("/alpha")
      .send(requestBody)
      .expect(400);

    expect(response.body).toEqual({ error: "Se esperaba un JSON válido" });
  });

  it("should throw an error when saving fails", async () => {
    // Datos de entrada
    const inputJson = {
      c: 3,
      b: 2,
      a: 1,
    };

    // Simular un error al guardar en la base de datos
    jest
      .spyOn(Alpha.prototype, "save")
      .mockRejectedValueOnce(new Error("Database error"));

    // Llamar al servicio y verificar que lance un error
    await expect(saveDisorderedJson(inputJson)).rejects.toThrowError(
      "Error al guardar el JSON desordenado"
    );
  });
});
