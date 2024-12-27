import { Observation } from "../entities/Observation";
import { ObservationRepository } from "../repositories/ObservationRepository";
import { ClientService } from "./ClientService";

export class ObservationService {
	static async createObservation(
		clientId: string,
		data: { text: string },
	): Promise<Observation> {
		const client = await ClientService.getClientById(clientId);
		const observation = ObservationRepository.create({ ...data, client });
		return await ObservationRepository.save(observation);
	}

	static async getObservationsByClient(
		clientId: string,
		page: number,
		size: number,
	): Promise<{ observations: Observation[]; total: number }> {
		const client = await ClientService.getClientById(clientId);

		const [observations, total] = await ObservationRepository.findAndCount({
			where: { client },
			order: { created_at: "DESC" },
			skip: (page - 1) * size,
			take: size,
		});
		return { observations, total };
	}
}
