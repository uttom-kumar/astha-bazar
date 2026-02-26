import express from "express";
const app = express();

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "./src/routes/api.js";

dotenv.config();

/* ================= ENV VARIABLES ================= */

const {
    DATABASE,
    REQUEST_NUMBER,
    REQUEST_TIME,
    URL_ENCODE,
    WEB_CACHE,
    WEB_JSON_SIZE,
} = process.env;

/* ================= SECURITY MIDDLEWARE ================= */

// Secure HTTP headers
app.use(helmet());

// Prevent HTTP parameter pollution
app.use(hpp());

// Enable CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

// Parse cookies
app.use(cookieParser());

/* ================= BODY PARSER ================= */

// Express built-in (no need body-parser)
app.use(express.json({ limit: WEB_JSON_SIZE || "10mb" }));
app.use(
    express.urlencoded({
        extended: URL_ENCODE === "true",
    })
);

/* ================= RATE LIMIT ================= */

const limiter = rateLimit({
    windowMs: parseInt(REQUEST_TIME) || 15 * 60 * 1000, // 15 min default
    max: parseInt(REQUEST_NUMBER) || 100, // 100 requests default
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

/* ================= CACHE ================= */

app.set("etag", WEB_CACHE === "true");

/* ================= DATABASE ================= */

mongoose
    .connect(DATABASE)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

/* ================= ROUTES ================= */

app.use("/api", router);

export default app;