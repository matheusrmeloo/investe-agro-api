import app from "./config/server";
import { initializeDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await initializeDatabase(); // Inicializa o banco de dados
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start the server:", error);
	}
};

startServer();
