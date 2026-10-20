import express from "express";
import cors from "cors"
import path from "path"
import catalogRoute from "./routes/catalogRoute";
import productionRoute from "./routes/productionRoute";

const app = express();

app.use(cors());
app.use(express.json());

//to access our curated catalog
app.use("/api/catalog", catalogRoute);

//production requests
app.use("/api/production", productionRoute);

// Serve React frontend as static files
app.use(express.static(path.join(__dirname, "../../client/dist")))

// Fallback: serve index.html for any non-API routes (for React Router)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
})

export default app;