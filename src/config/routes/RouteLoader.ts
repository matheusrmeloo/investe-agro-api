import { configureRoutes } from "./Route";
import fs from "fs";
import path from "path";

export const loadRoutes = () => {
	const controllersPath = path.resolve(__dirname, "../../controllers");
	const controllers: any[] = [];

	fs.readdirSync(controllersPath).forEach((file) => {
		if (file.endsWith(".ts") || file.endsWith(".js")) {
			const Controller = require(path.join(controllersPath, file)).default;
			controllers.push(Controller);
		}
	});

	return configureRoutes(controllers);
};
