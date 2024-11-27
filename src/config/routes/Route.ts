import { Router } from "express";

type HttpMethod =
	| "get"
	| "post"
	| "put"
	| "delete"
	| "patch"
	| "options"
	| "head";

export const router = Router();
const routeRegistry: { path: string; method: string; handler: Function }[] = [];

/**
 * Decorador para definir uma rota HTTP.
 * @param path Caminho da rota.
 * @param method Método HTTP (GET, POST, etc.).
 */
export const Route = (path: string, method: HttpMethod) => {
	return (target: any, propertyKey: string) => {
		routeRegistry.push({
			path,
			method,
			handler: target[propertyKey],
		});
	};
};

/**
 * Configura todas as rotas no roteador Express.
 */
export const configureRoutes = (controllers: any[]) => {
	controllers.forEach((Controller) => {
		const instance = new Controller();
		routeRegistry.forEach(({ path, method, handler }) => {
			if (instance[handler.name]) {
				(router as any)[method](path, handler.bind(instance));
			}
		});
	});
	return router;
};
