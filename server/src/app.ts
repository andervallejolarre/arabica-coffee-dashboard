import express from "express";
import cors from "cors"
import catalogRoute from "./routes/catalogRoute";
import productionRoute from "./routes/productionRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/catalog", catalogRoute)
app.use("/api/production", productionRoute);

export default app;