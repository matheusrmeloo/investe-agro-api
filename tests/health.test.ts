import request from "supertest";
import app from "../src/config/server";

describe("Health Endpoint", () => {
	it("should return health status", async () => {
		const response = await request(app).get("/healthy");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("status", "ok");
		expect(response.body).toHaveProperty("uptime");
	});
});
