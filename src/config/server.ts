import express from "express";
import cors from "cors";
import { loadRoutes } from "../config/routes/RouteLoader";

const app = express();

// Middleware para habilitar CORS para todas as origens
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Carregar e registrar todas as rotas
app.use(loadRoutes());

export default app;
