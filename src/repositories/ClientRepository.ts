import { AppDataSource } from "../config/database";
import { Client } from "../entities/Client";

export const ClientRepository = AppDataSource.getRepository(Client);
