import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { ObservationService } from "../services/ObservationService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class ObservationController {
	@Route("/clients/:id/observations", "post")
	public async createObservation(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const observation = await ObservationService.createObservation(
				req.params.id,
				req.body,
			);
			return successResponse(res, 201, observation);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	@Route("/clients/:id/observations", "get")
	public async getObservationsByClient(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const page = parseInt(req.query.page as string, 10) || 1;
			const size = parseInt(req.query.size as string, 10) || 10;
			if (isNaN(page) || isNaN(size)) {
				return errorResponse(
					res,
					400,
					"Os parâmetros page e size devem ser números.",
				);
			}

			const observations = await ObservationService.getObservationsByClient(
				req.params.id,
				page,
				size,
			);
			return successResponse(res, 200, observations);
		} catch (error: any) {
			return errorResponse(res, 404, error.message);
		}
	}
}
