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
const routeRegistry: {
	path: string;
	method: HttpMethod;
	handler: Function;
	middlewares?: Array<Function>;
}[] = [];

/**
 * Decorador para definir uma rota HTTP com middlewares opcionais.
 * @param path Caminho da rota.
 * @param method Método HTTP (GET, POST, etc.).
 * @param middlewares Array de middlewares a serem aplicados na rota (opcional).
 */
export const Route = (
	path: string,
	method: HttpMethod,
	middlewares: Array<Function> = [],
) => {
	return (target: any, propertyKey: string) => {
		routeRegistry.push({
			path,
			method,
			handler: target[propertyKey],
			middlewares,
		});
	};
};

/**
 * Configura todas as rotas no roteador Express.
 */
export const configureRoutes = (controllers: any[]) => {
	controllers.forEach((Controller) => {
		const instance = new Controller();
		routeRegistry.forEach(({ path, method, handler, middlewares }) => {
			if (instance[handler.name]) {
				(router as any)[method](
					path,
					...(middlewares || []),
					handler.bind(instance),
				);
			}
		});
	});
	return router;
};
