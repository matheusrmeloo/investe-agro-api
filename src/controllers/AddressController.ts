import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { AddressService } from "../services/AddressService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class AddressController {
	@Route("/addresses", "post")
	public async createAddress(req: Request, res: Response): Promise<Response> {
		try {
			const address = await AddressService.createAddress(req.body);
			return successResponse(res, 201, address);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	@Route("/addresses/:id", "get")
	public async getAddressById(req: Request, res: Response): Promise<Response> {
		try {
			const address = await AddressService.getAddressById(req.params.id);
			return successResponse(res, 200, address);
		} catch (error: any) {
			return errorResponse(res, 404, error.message);
		}
	}
}
