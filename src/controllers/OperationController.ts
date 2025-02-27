import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { OperationService } from "../services/OperationService";
import { successResponse, errorResponse } from "../utils/ResponseUtil";
import { NotFoundError } from "../utils/errors/NotFoundError";

export default class OperationController {
    /**
     * Lista todas as operações.
     */
    @Route("/operations", "get")
    public async getAllOperations(req: Request, res: Response): Promise<Response> {
        try {
            const { client_id, production_id, deleted } = req.query;

            const page = parseInt(req.query.page as string, 10) || 1;
			const size = parseInt(req.query.size as string, 10) || 10;
			if (isNaN(page) || isNaN(size)) {
				return errorResponse(
					res,
					400,
					"Os parâmetros page e size devem ser números.",
				);
			}

            const operations = await OperationService.getAllOperations({
                client_id,
                production_id,
                deleted: deleted === "false",
            }, page, size);
            return successResponse(res, 200, operations);
        } catch (error: any) {
            return errorResponse(res, 500, error.message);
        }
    }

    /**
     * Cria uma nova operação.
     */
    @Route("/operations", "post")
    public async createOperation(req: Request, res: Response): Promise<Response> {
        try {
            const operation = await OperationService.createOperation(req.body);
            return successResponse(res, 201, operation);
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return errorResponse(res, 404, error.message);
            }
            return errorResponse(res, 400, error.message);
        }
    }

    /**
     * Busca uma operação por ID.
     */
    @Route("/operations/:id", "get")
    public async getOperationById(req: Request, res: Response): Promise<Response> {
        try {
            const operation = await OperationService.getOperationById(req.params.id);
            return successResponse(res, 200, operation);
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return errorResponse(res, 404, error.message);
            }
            return errorResponse(res, 500, error.message);
        }
    }

    /**
     * Atualiza uma operação.
     */
    @Route("/operations/:id", "put")
    public async updateOperation(req: Request, res: Response): Promise<Response> {
        try {
            const operation = await OperationService.updateOperation(req.params.id, req.body);
            return successResponse(res, 200, operation);
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return errorResponse(res, 404, error.message);
            }
            return errorResponse(res, 400, error.message);
        }
    }

    /**
     * Remove uma operação.
     */
    @Route("/operations/:id", "delete")
    public async deleteOperation(req: Request, res: Response): Promise<Response> {
        try {
            await OperationService.deleteOperation(req.params.id);
            return successResponse(res, 204, null);
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return errorResponse(res, 404, error.message);
            }
            return errorResponse(res, 500, error.message);
        }
    }
}