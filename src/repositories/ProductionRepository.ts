import { AppDataSource } from "../config/database";
import { Production } from "../entities/Production";

export const ProductionRepository = AppDataSource.getRepository(Production);