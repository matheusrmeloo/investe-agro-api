import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { NeighborhoodService } from "../services/NeighborhoodService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";
import { NeighborhoodFilter } from "../models/NeighborhoodFilter";

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
			const filters: NeighborhoodFilter = {
				name: req.query.name as string,
				city: req.query.city as string,
				state: req.query.state as string,
			};

			const neighborhoods = await NeighborhoodService.getAllNeighborhoods(
				filters,
			);
			return successResponse(res, 200, neighborhoods);
		} catch (error: any) {
			return errorResponse(res, 500, error.message);
		}
	}

	@Route("/neighborhoods/states", "get")
	public async getAllNeighborhoodsStates(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const states = await NeighborhoodService.getAllNeighborhoodsStates();
			return successResponse(res, 200, states);
		} catch (error: any) {
			return errorResponse(res, 500, error.message);
		}
	}

	@Route("/neighborhoods/cities", "get")
	public async getAllNeighborhoodsCities(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const filters: NeighborhoodFilter = {
				state: req.query.state as string,
			};
			const cities = await NeighborhoodService.getAllNeighborhoodsCities(
				filters,
			);
			return successResponse(res, 200, cities);
		} catch (error: any) {
			return errorResponse(res, 500, error.message);
		}
	}
}
