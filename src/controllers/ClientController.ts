import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { ClientService } from "../services/ClientService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class ClientController {
	/**
	 * Lista todos os clientes com filtros opcionais.
	 */
	@Route("/clients", "get")
	public async getAllClients(req: Request, res: Response): Promise<Response> {
		try {
			const { address, production } = req.query;
			const clients = await ClientService.getAllClients({
				address,
				production,
			});
			return successResponse(res, 200, clients);
		} catch (error: any) {
			return errorResponse(res, 500, error.message);
		}
	}

	/**
	 * Cadastra um novo cliente.
	 */
	@Route("/clients", "post")
	public async createClient(req: Request, res: Response): Promise<Response> {
		try {
			const client = await ClientService.createClient(req.body);
			return successResponse(res, 201, client);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Exibe detalhes de um cliente.
	 */
	@Route("/clients/:id", "get")
	public async getClientById(req: Request, res: Response): Promise<Response> {
		try {
			const client = await ClientService.getClientById(Number(req.params.id));
			return successResponse(res, 200, client);
		} catch (error: any) {
			return errorResponse(res, 404, error.message);
		}
	}

	/**
	 * Atualiza um cliente.
	 */
	@Route("/clients/:id", "put")
	public async updateClient(req: Request, res: Response): Promise<Response> {
		try {
			const client = await ClientService.updateClient(
				Number(req.params.id),
				req.body,
			);
			return successResponse(res, 200, client);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Remove um cliente.
	 */
	@Route("/clients/:id", "delete")
	public async deleteClient(req: Request, res: Response): Promise<Response> {
		try {
			await ClientService.deleteClient(Number(req.params.id));
			return successResponse(res, 204, null);
		} catch (error: any) {
			return errorResponse(res, 404, error.message);
		}
	}
}
