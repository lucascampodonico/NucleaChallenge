import supertest from "supertest";
import app from "../app";
import alphaRoutes from "../routes/alpha.routes";
import { AppDataSource } from "../db";
import { saveDisorderedJson } from "../services/alpha.service";
import { alphabetize } from "../controllers/alpha.controller";
import { Request, Response } from "express";
import { Alpha } from "../entities/alpha.entity";

beforeAll(async () => {
  await AppDataSource.initialize();
  app.use(alphaRoutes);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

afterEach(async () => {
  await new Promise((resolve) => setImmediate(resolve));
});

describe("PUT /alpha", () => {
  it("should return the sorted JSON object", async () => {
    const requestBody = {
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    };

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
    const requestBody = "invalid input";

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
