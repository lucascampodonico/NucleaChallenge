import supertest from "supertest";
import app from "../app";
import quotesRoutes from "../routes/quotes.routes";
import { AppDataSource } from "../db";
import { Quote } from "../entities/quote.entity";

beforeAll(async () => {
  await AppDataSource.initialize();
  app.use(quotesRoutes);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

afterEach(async () => {
  await new Promise((resolve) => setImmediate(resolve));
});

describe("POST /quote", () => {
  it("should return a quote object", async () => {
    const response = await supertest(app).post("/quote").expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        author: expect.any(String),
        quote: expect.any(String),
        consultation_date: expect.any(String),
      })
    );
  });

  it("should save a quote in the database", async () => {
    // Realizar solicitud POST a /quote
    const response = await supertest(app).post("/quote").expect(200);

    // Convertir la fecha en la respuesta esperada a un objeto Date
    const expectedQuote = {
      ...response.body,
      consultation_date: new Date(response.body.consultation_date),
    };
    // Obtener el autor de la respuesta
    const { author } = response.body;
    // Consultar la base de datos para obtener las citas guardadas
    const quote = await Quote.find({ where: { author } });
    // Verificar que la cita enviada en la solicitud POST esté presente en la respuesta
    expect(quote).toContainEqual(expectedQuote);
  });
});

describe("GET /quotes", () => {
  it("should return all quotes in the database", async () => {
    const response = await supertest(app).get("/quotes").expect(200);

    expect(response.body).toEqual(
      expect.objectContaining(
        Object.fromEntries(
          Object.entries(response.body).map(([author, quotes]) => [
            author,
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                quote: expect.any(String),
                consultation_date: expect.any(String),
              }),
            ]),
          ])
        )
      )
    );
  });

  it("should handle errors when getting quotes", async () => {
    // Simular un error al obtener las citas
    jest
      .spyOn(Quote, "find")
      .mockRejectedValueOnce(new Error("Database error"));

    const response = await supertest(app).get("/quotes").expect(500);

    expect(response.body).toEqual({
      message: "Error al obtener las citas",
    });
  });
});
