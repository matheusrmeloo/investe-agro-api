import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../../config/env";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: config.database.host,
	port: config.database.port,
	username: config.database.username,
	password: config.database.password,
	database: config.database.name,
	synchronize: false, // Nunca usar em produção. Usar migrations!
	logging: false,
	entities: [`${__dirname}/../../entities/**/*.ts`], // Entidades do TypeORM
	migrations: [`${__dirname}/migrations/*.ts`],
	subscribers: [],
});

/**
 * Função para inicializar a conexão com o banco de dados.
 */
export const initializeDatabase = async (): Promise<void> => {
	try {
		await AppDataSource.initialize();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1); // Encerrar o processo caso não consiga conectar
	}
};

//migration command
//yarn typeorm migration:generate src/config/database/migrations/AddObservations -- -d src/config/database/index.ts
