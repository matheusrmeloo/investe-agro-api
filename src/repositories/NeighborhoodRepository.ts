import { AppDataSource } from "../config/database";
import { Neighborhood } from "../entities/Neighborhood";

export const NeighborhoodRepository = AppDataSource.getRepository(Neighborhood);
