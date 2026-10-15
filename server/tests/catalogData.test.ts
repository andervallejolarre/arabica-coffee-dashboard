import { afterEach, describe, expect, it, jest } from "@jest/globals";
import request from 'supertest';

import { getFreshApp } from "./helpers/testHelpers"
import { countryData } from "../src/data/countryData";

afterEach(() => {
    jest.restoreAllMocks();
});

//Success Scenarios
describe('GET /api/catalog/', () => {

    it('Successful request with only UI-safe fields', async () => {
        const app = await getFreshApp();

        const response = await request(app).get("/api/catalog");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            countryData.map(({ slug, name, continent, geoId }) => ({ slug, name, continent, geoId }))
        );
    });

    it('returns the full catalog with 33 countries', async () => {
        const app = await getFreshApp();

        const response = await request(app).get("/api/catalog");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(countryData.length);
    });

    it('Spot Checked Country', async () => {
        const app = await getFreshApp();

        const response = await request(app).get("/api/catalog");

        expect(response.body).toEqual(
            expect.arrayContaining([
                { slug: "brazil", name: "Brazil", continent: "South America", geoId: "076" },
            ])
        );
    });

    it('does not require a FAOSTAT auth token to respond', async () => {
        const app = await getFreshApp();
        const fetchMock = jest.spyOn(global, "fetch");

        const response = await request(app).get("/api/catalog");

        expect(response.status).toBe(200);
        expect(fetchMock).not.toHaveBeenCalled();
    });
});