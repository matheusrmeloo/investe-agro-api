import { Neighborhood } from "../entities/Neighborhood";
import { NeighborhoodRepository } from "../repositories/NeighborhoodRepository";

export class NeighborhoodService {
	static async createNeighborhood(
		data: Partial<Neighborhood>,
	): Promise<Neighborhood> {
		const neighborhood = NeighborhoodRepository.create(data);
		return await NeighborhoodRepository.save(neighborhood);
	}

	static async getAllNeighborhoods(): Promise<Neighborhood[]> {
		return await NeighborhoodRepository.find();
	}
}
