import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/env";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

/**
 * Extensão da interface Request para incluir a propriedade user.
 */
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

/**
 * Middleware para verificar se o usuário está autenticado.
 */
export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).json({ error: "Token não fornecido." });
		return;
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		res.status(401).json({ error: "Token não fornecido." });
		return;
	}

	try {
		const payload = jwt.verify(token, config.jwtSecret) as any;
		req.user = payload;
		next();
	} catch (error) {
		res.status(401).json({ error: "Token inválido." });
	}
};

/**
 * Middleware para verificar se o usuário é administrador.
 */
export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// Verifica se existem usuários no banco de dados
		const userRepository = AppDataSource.getRepository(User);
		const usersCount = await userRepository.count();

		// Permite o cadastro inicial de admin se o banco estiver vazio
		if (usersCount === 0) {
			return next();
		}

		// Caso contrário, verifica se o usuário está autenticado e é admin
		isAuthenticated(req, res, () => {
			if (req.user.role !== "admin") {
				res.status(403).json({ error: "Permissão negada." });
				return;
			}
			next();
		});
	} catch (error) {
		console.error("Erro no middleware de administração:", error);
		res.status(500).json({ error: "Erro interno no servidor." });
	}
};
