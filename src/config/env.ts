import dotenv from "dotenv";

dotenv.config();

export default {
	database: {
		host: process.env.DB_HOST || "localhost",
		port: parseInt(process.env.DB_PORT || "5432", 10),
		username: process.env.DB_USER || "postgres",
		password: process.env.DB_PASSWORD || "postgres",
		name: process.env.DB_NAME || "app_db",
	},
	jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key",
};
