import express, { Request, Response } from "express";
import { loadRoutes } from "./routes/RouteLoader";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(loadRoutes());

export default app;
