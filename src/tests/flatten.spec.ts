import supertest from "supertest";
import app from "../app";
import flattenRoutes from "../routes/flatten.routes";
import { AppDataSource } from "../db";

// Configuración inicial antes de todas las pruebas
beforeAll(async () => {
  await AppDataSource.initialize();
  app.use(flattenRoutes);
});

// Limpieza después de todas las pruebas
afterAll(async () => {
  await AppDataSource.destroy();
});

// Limpieza después de cada prueba
afterEach(async () => {
  await new Promise((resolve) => setImmediate(resolve));
});

describe("POST /flatten", () => {
  it("should return the flatten JSON object", async () => {
    // Preparación de datos de prueba
    const requestBody = {
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    };

    // Realizar la solicitud y realizar la comprobación
    const response = await supertest(app)
      .post("/flatten")
      .send(requestBody)
      .expect(200);

    const flattenJson = {
      fruit: "apple",
      animal: "zebra",
      "city-list": "sunnyvale,sanjose",
    };

    expect(response.body).toEqual(flattenJson);
  });

  it("should return 400 if the input is invalid", async () => {
    // Preparación de datos de prueba inválidos
    const requestBody = "invalid input";

    // Realizar la solicitud y realizar la comprobación
    const response = await supertest(app)
      .post("/flatten")
      .send(requestBody)
      .expect(400);

    expect(response.body).toEqual({ error: "Se esperaba un JSON válido" });
  });
});
