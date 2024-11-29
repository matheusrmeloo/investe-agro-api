import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/env";

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
export const isAdmin = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	isAuthenticated(req, res, () => {
		if (req.user.role !== "admin") {
			res.status(403).json({ error: "Permissão negada." });
			return;
		}
		next();
	});
};
