export default class HealthService {
	public static async getHealthStatus(): Promise<{
		status: string;
		uptime: number;
	}> {
		return {
			status: "ok",
			uptime: process.uptime(),
		};
	}
}
