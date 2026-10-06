import { Request, Response } from "express";
import { sendError } from '../utils/response';
import {countryData} from '../data/countryData'

import type {CountrySummary} from "../types/catalogTypes"

//function called by our front-end to fetch the country catalog
export const catalogData = async (req: Request, res: Response): Promise<void> => {
    try {
        const catalog: CountrySummary[] = countryData.map((item) => ({
            slug: item.slug,
            name: item.name,
            continent: item.continent,
            geoId: item.geoId
        }));

        res.json(catalog);
    } catch (err) {
        sendError(res, 500, 'Something went wrong');
    }
}
