import { AppDataSource } from "../config/database";
import { Observation } from "../entities/Observation";

export const ObservationRepository = AppDataSource.getRepository(Observation);
