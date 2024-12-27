import { AppDataSource } from "../config/database";

export default class HealthService {
	/**
	 * Retorna o status de saúde do sistema.
	 */
	public static async getHealthStatus(): Promise<any> {
		let databaseStatus = "disconnected";

		try {
			// Verifica a conectividade do banco de dados
			if (AppDataSource.isInitialized) {
				await AppDataSource.query("SELECT 1");
				databaseStatus = "connected";
			} else {
				databaseStatus = "not_initialized";
			}
		} catch (error) {
			console.error("Database Connection Error:", error);
			databaseStatus = "error";
		}

		return {
			service: "up",
			database: databaseStatus,
			timestamp: new Date().toISOString(),
		};
	}
}
