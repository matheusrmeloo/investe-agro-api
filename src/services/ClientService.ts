import { Client } from "../entities/Client";
import { ClientRepository } from "../repositories/ClientRepository";

export class ClientService {
	public static async getAllClients(filters: any): Promise<Client[]> {
		const query = ClientRepository.createQueryBuilder("client")
			.leftJoinAndSelect("client.spouses", "spouse")
			.leftJoinAndSelect("client.productions", "production");

		if (filters.address) {
			query.andWhere("client.address LIKE :address", {
				address: `%${filters.address}%`,
			});
		}

		if (filters.production) {
			query.andWhere("production.type = :type", { type: filters.production });
		}

		return await query.getMany();
	}

	public static async createClient(data: Client): Promise<Client> {
		const existingClient = await ClientRepository.findOneBy({
			document_number: data.document_number,
		});
		if (existingClient) {
			throw new Error("CPF já cadastrado.");
		}

		const client = ClientRepository.create(data);
		return await ClientRepository.save(client);
	}

	public static async getClientById(id: number): Promise<Client> {
		const client = await ClientRepository.findOne({
			where: { id },
			relations: ["spouses", "productions"],
		});
		if (!client) {
			throw new Error("Cliente não encontrado.");
		}
		return client;
	}

	public static async updateClient(id: number, data: any): Promise<Client> {
		const client = await ClientRepository.findOneBy({ id });
		if (!client) {
			throw new Error("Cliente não encontrado.");
		}

		if (data.cpf && data.cpf !== client.document_number) {
			const existingClient = await ClientRepository.findOneBy({
				document_number: data.cpf,
			});
			if (existingClient) {
				throw new Error("CPF já cadastrado.");
			}
		}

		ClientRepository.merge(client, data);
		return await ClientRepository.save(client);
	}

	public static async deleteClient(id: number): Promise<void> {
		const client = await ClientRepository.findOneBy({ id });
		if (!client) {
			throw new Error("Cliente não encontrado.");
		}

		await ClientRepository.remove(client);
	}
}
