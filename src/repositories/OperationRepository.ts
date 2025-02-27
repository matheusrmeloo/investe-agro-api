import { AppDataSource } from "../config/database";
import { Operation } from "../entities/Operation";

export const OperationRepository = AppDataSource.getRepository(Operation);