import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { AddressService } from "../services/AddressService";
import { ClientService } from "../services/ClientService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class AddressController {
	@Route("/clients/:id/addresses", "post")
	public async createOrUpdateAddress(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const client = await ClientService.getClientById(Number(req.params.id));
			const address = await AddressService.createOrUpdateAddress(
				client,
				req.body,
			);
			return successResponse(res, 201, address);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	@Route("/clients/:id/addresses", "get")
	public async getAddressByClient(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const address = await AddressService.getAddressByClient(
				Number(req.params.id),
			);
			return successResponse(res, 200, address);
		} catch (error: any) {
			return errorResponse(res, 404, error.message);
		}
	}
}
