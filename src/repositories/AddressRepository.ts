import { AppDataSource } from "../config/database";
import { Address } from "../entities/Address";

export const AddressRepository = AppDataSource.getRepository(Address);
