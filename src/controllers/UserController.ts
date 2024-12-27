import { Request, Response } from "express";
import { Route } from "../config/routes/Route";
import { UserService } from "../services/UserService";
import { isAuthenticated, isAdmin } from "../middleware/AuthMiddleware";
import { successResponse, errorResponse } from "../utils/ResponseUtil";

export default class UserController {
	/**
	 * Endpoint de Login
	 * POST /auth/login
	 */
	@Route("/auth/login", "post")
	public async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			const { user, token } = await UserService.authenticateUser(
				email,
				password,
			);
			return successResponse(res, 200, { user, token });
		} catch (error: any) {
			return errorResponse(res, 401, error.message);
		}
	}

	/**
	 * Endpoint de Registro de Usuários
	 * POST /auth/register
	 * Middleware: isAdmin
	 */
	@Route("/auth/register", "post", [isAdmin])
	public async register(req: Request, res: Response): Promise<Response> {
		try {
			const user = await UserService.registerUser(req.body);
			return successResponse(res, 201, user);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Endpoint para Listar Todos os Usuários
	 * GET /users
	 * Middleware: isAdmin
	 */
	@Route("/users", "get", [isAdmin])
	public async getAllUsers(req: Request, res: Response): Promise<Response> {
		try {
			const users = await UserService.getAllUsers();
			return successResponse(res, 200, users);
		} catch (error: any) {
			return errorResponse(res, 500, error.message);
		}
	}

	/**
	 * Endpoint para Obter um Usuário por ID
	 * GET /users/:id
	 * Middleware: isAuthenticated
	 */
	@Route("/users/:id", "get", [isAuthenticated])
	public async getUserById(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const user = await UserService.getUserById(id);
			return successResponse(res, 200, user);
		} catch (error: any) {
			return errorResponse(res, 404, error.message);
		}
	}

	/**
	 * Endpoint para Atualizar um Usuário
	 * PUT /users/:id
	 * Middleware: isAuthenticated
	 */
	@Route("/users/:id", "put", [isAuthenticated])
	public async updateUser(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const updatedUser = await UserService.updateUser(
				id,
				req.body,
				req.user.role,
			);
			return successResponse(res, 200, updatedUser);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Endpoint para Deletar um Usuário
	 * DELETE /users/:id
	 * Middleware: isAdmin
	 */
	@Route("/users/:id", "delete", [isAdmin])
	public async deleteUser(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			await UserService.deleteUser(id);
			return successResponse(res, 204, null);
		} catch (error: any) {
			return errorResponse(res, 400, error.message);
		}
	}
}
