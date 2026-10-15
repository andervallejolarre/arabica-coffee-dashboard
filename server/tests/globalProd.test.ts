import { afterEach, describe, expect, it, jest } from "@jest/globals";
import request from 'supertest';

import { getFreshApp, successfulLogin, productionData } from "./helpers/testHelpers"

afterEach(() => {
  jest.restoreAllMocks();
});

//Success Scenarios
describe('GET /api/production/global', () => {

  it('logs In and continues to the global production controller', async () => {
    const app = await getFreshApp();
    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock
      .mockResolvedValueOnce(successfulLogin())
      .mockResolvedValueOnce(productionData());

    const response = await request(app).get("/api/production/global");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { year: 2025, value: Math.round(123 / 66.41) },
      { year: 2024, value: Math.round(100 / 66.41) },
    ]);
  });

  it('response filters any number of key/values getting back only year and value', async () => {
    const app = await getFreshApp();
    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock
      .mockResolvedValueOnce(successfulLogin())
      .mockResolvedValueOnce(productionData([{ Year: 2025, Value: 123, Stock: "coffee", Measure: "T", Currency: "USD" }]));

    const response = await request(app).get("/api/production/global");

    expect(response.body).toEqual([
      { year: 2025, value: Math.round(123 / 66.41) },
    ]);
  });

  it('succesfull request even if FAOSTAT responds with an empty array', async () => {
    const app = await getFreshApp();
    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock
      .mockResolvedValueOnce(successfulLogin())
      .mockResolvedValueOnce(productionData([]));

    const response = await request(app).get("/api/production/global");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

//Errors
describe('GET /api/production/global', () => {

  ////Faostat returns 401, 429 or 500, API forwards that status and returns the FAOSTAT API ERROR envelope.
  it('API errors are processed and handled by controller ', async () => {
    const app = await getFreshApp();
    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock
      .mockResolvedValueOnce(successfulLogin())
      .mockResolvedValueOnce(
        new Response("Invalid credentials", { status: 401 })
      );

    const response = await request(app).get("/api/production/global");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      ok: false,
      payload: "FAOSTAT API ERROR: Invalid credentials"
    });
  });

  it('massive server system failure', async () => {
    const app = await getFreshApp();
    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock
      .mockResolvedValueOnce(successfulLogin())
      .mockRejectedValueOnce(
        new Error("Network unavailable")
      );

    const response = await request(app).get("/api/production/global");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      ok: false,
      payload: expect.stringContaining("Something went wrong"),
    });
  });
})
