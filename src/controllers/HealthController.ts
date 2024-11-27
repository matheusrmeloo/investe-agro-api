import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import HealthService from "../services/HealthService";
import HealthCheck from "../models/HealthCheck";

export default class HealthController {
	@Route("/healthy", "get")
	public async checkHealth(req: Request, res: Response): Promise<Response> {
		try {
			const status: HealthCheck = await HealthService.getHealthStatus();
			return res.status(200).json(status);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
