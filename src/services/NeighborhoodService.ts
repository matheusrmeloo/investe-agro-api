import { Neighborhood } from "../entities/Neighborhood";
import { NeighborhoodFilter } from "../models/NeighborhoodFilter";
import { NeighborhoodRepository } from "../repositories/NeighborhoodRepository";

export class NeighborhoodService {
	static async createNeighborhood(
		data: Partial<Neighborhood>,
	): Promise<Neighborhood> {
		const neighborhood = NeighborhoodRepository.create(data);
		return await NeighborhoodRepository.save(neighborhood);
	}

	static async getAllNeighborhoods(
		filters: NeighborhoodFilter,
	): Promise<Neighborhood[]> {
		const query = NeighborhoodRepository.createQueryBuilder("neighborhood");

		if (filters.name)
			query.andWhere("neighborhood.name = :name", { name: filters.name });

		if (filters.city)
			query.andWhere("neighborhood.city = :city", { city: filters.city });

		if (filters.state)
			query.andWhere("neighborhood.state = :state", { state: filters.state });

		return await query.getMany();
	}

	static async getAllNeighborhoodsStates(): Promise<any> {
		return await NeighborhoodRepository.createQueryBuilder("neighborhood")
			.select("neighborhood.state", "state")
			.groupBy("neighborhood.state")
			.getRawMany();
	}

	static async getAllNeighborhoodsCities(
		filters: NeighborhoodFilter,
	): Promise<any> {
		const query = NeighborhoodRepository.createQueryBuilder(
			"neighborhood",
		).select("neighborhood.city", "city");

		if (filters.state)
			query.andWhere("neighborhood.state = :state", { state: filters.state });

		return await query.groupBy("neighborhood.city").getRawMany();
	}
}
