import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { NeighborhoodService } from "../services/NeighborhoodService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class NeighborhoodController {
	@Route("/neighborhoods", "post")
	public async createNeighborhood(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const neighborhood = await NeighborhoodService.createNeighborhood(
				req.body,
			);
			return successResponse(res, 201, neighborhood);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	@Route("/neighborhoods", "get")
	public async getAllNeighborhoods(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const neighborhoods = await NeighborhoodService.getAllNeighborhoods();
			return successResponse(res, 200, neighborhoods);
		} catch (error: any) {
			return errorResponse(res, 500, error.message);
		}
	}
}
