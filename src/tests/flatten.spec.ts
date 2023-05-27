import supertest from "supertest";
import app from "../app";
import flattenRoutes from "../routes/flatten.routes";
import { AppDataSource } from "../db";

beforeAll(async () => {
  await AppDataSource.initialize();
  app.use(flattenRoutes);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

afterEach(async () => {
  await new Promise((resolve) => setImmediate(resolve));
});

describe("POST /flatten", () => {
  it("should return the flatten JSON object", async () => {
    const requestBody = {
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    };

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
    const requestBody = "invalid input";

    const response = await supertest(app)
      .post("/flatten")
      .send(requestBody)
      .expect(400);

    expect(response.body).toEqual({ error: "Se esperaba un JSON válido" });
  });
});
