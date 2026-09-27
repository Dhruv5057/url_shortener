import "dotenv/config";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

import express from "express";

connectDB();

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/urls", urlRoutes);

app.get("/", (req, res) => {
    res.send("URL Shortener API is running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});