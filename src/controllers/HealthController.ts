import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import HealthService from "../services/HealthService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class HealthController {
	@Route("/healthy", "get")
	public async checkHealth(req: Request, res: Response): Promise<Response> {
		try {
			const status = await HealthService.getHealthStatus();
			return successResponse(res, 200, status);
		} catch (error: any) {
			console.error("Health Check Error:", error);
			return errorResponse(res, 500, "Internal Server Error");
		}
	}
}
