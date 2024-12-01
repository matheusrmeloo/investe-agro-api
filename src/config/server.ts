import express from "express";
import { loadRoutes } from "../config/routes/RouteLoader";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Carregar e registrar todas as rotas
app.use(loadRoutes());

export default app;
