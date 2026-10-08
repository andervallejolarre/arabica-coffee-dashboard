import express from "express";
import {countryProduction, globalProduction} from "../controllers/productionController";
import { tokenStatus } from "../middleware/authManager";

const productionRoute = express.Router();

//fetching global production data
productionRoute.get("/global", tokenStatus, globalProduction);

//no country selected: empty production list so the front-end clears the previous chart
productionRoute.get("/", (req, res) => {
    res.json([]);
});

//passing a country name through params and passing a middleware before reaching our controller
productionRoute.get("/:country", tokenStatus, countryProduction);

export default productionRoute;