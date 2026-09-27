import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortCode = Math.random().toString(36).substring(2, 8);

        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        res.status(201).json({
            originalUrl,
            shortCode
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

export default router;