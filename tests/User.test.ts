import request from "supertest";
import bcrypt from "bcrypt";
import app from "../src/config/server";
import {
	initializeDatabase,
	AppDataSource,
} from "../src/config/database/index";
import { UserRepository } from "../src/repositories/UserRepository";

beforeAll(async () => {
	await initializeDatabase();
	// Criar um usuário admin para testes
	const adminUser = UserRepository.create({
		name: "Admin User",
		email: "admin@example.com",
		password: await bcrypt.hash("adminpassword", 10),
		role: "admin",
	});
	await UserRepository.save(adminUser);
});

afterAll(async () => {
	await AppDataSource.destroy();
});

describe("User Endpoints", () => {
	it("should authenticate a valid user", async () => {
		const response = await request(app)
			.post("/auth/login")
			.send({ email: "admin@example.com", password: "adminpassword" });
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
		expect(response.body.user).toHaveProperty("id");
		expect(response.body.user).toHaveProperty("name", "Admin User");
		expect(response.body.user).toHaveProperty("role", "admin");
	});

	it("should not authenticate with invalid credentials", async () => {
		const response = await request(app)
			.post("/auth/login")
			.send({ email: "admin@example.com", password: "wrongpassword" });
		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("error", "Credenciais inválidas.");
	});
});
