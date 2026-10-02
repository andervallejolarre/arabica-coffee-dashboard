import express from "express";
import {catalogData} from "../controllers/catalogController";

const catalogRoute = express.Router();

//fetching the country catalog
catalogRoute.get("/", catalogData);

export default catalogRoute;