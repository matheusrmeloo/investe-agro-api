import { Client } from "../entities/Client";
import { CreateClientDTO } from "../models/ClientDTO";
import { ClientRepository } from "../repositories/ClientRepository";
import { AddressService } from "./AddressService";

export class ClientService {
	public static async getAllClients(filters: any): Promise<Client[]> {
		const query = ClientRepository.createQueryBuilder("client")
			.leftJoinAndSelect("client.spouses", "spouse")
			.leftJoinAndSelect("client.productions", "production")
			.leftJoinAndSelect("client.address", "address")
			.leftJoinAndSelect("address.neighborhood", "neighborhood");

		if (filters.production) {
			query.andWhere("production.type = :type", { type: filters.production });
		}

		if (filters.name) {
			query.andWhere("client.name = :name", { name: filters.name });
		}

		if (filters.documentNumber) {
			query.andWhere("client.document_number = :documentNumber", {
				documentNumber: filters.documentNumber,
			});
		}

		return await query.getMany();
	}

	public static async createClient(data: CreateClientDTO): Promise<Client> {
		const { address, ...clientData } = data;

		const existingClient = await ClientRepository.findOneBy({
			document_number: clientData.document_number,
		});
		if (existingClient) {
			throw new Error("CPF já cadastrado.");
		}

		const client = ClientRepository.create(clientData);
		if (!client) {
			throw new Error("Falha ao criar cliente.");
		}

		if (address) {
			const createdAddress = await AddressService.createAddress(address);
			client.address = createdAddress;
		}

		const savedClient = await ClientRepository.save(client);
		return savedClient;
	}

	public static async getClientById(id: string): Promise<Client> {
		const client = await ClientRepository.findOne({
			where: { id },
			relations: ["spouses", "productions", "address", "address.neighborhood"],
		});
		if (!client) {
			throw new Error("Cliente não encontrado.");
		}
		return client;
	}

	public static async updateClient(id: string, data: any): Promise<Client> {
		const { address, ...clientData } = data;
		const client = await ClientRepository.findOne({ where: { id } });
		if (!client) {
			throw new Error("Cliente não encontrado.");
		}

		if (
			clientData.document_number &&
			clientData.document_number !== client.document_number
		) {
			const existingClient = await ClientRepository.findOneBy({
				document_number: clientData.document_number,
			});
			if (existingClient) {
				throw new Error("CPF já cadastrado.");
			}
		}

		ClientRepository.merge(client, clientData);
		let savedClient = await ClientRepository.save(client);

		if (address) {
			const createdAddress = await AddressService.createAddress({
				...address,
			});
			savedClient.address = createdAddress;
			savedClient = await ClientRepository.save(savedClient);
		}

		return savedClient;
	}

	public static async deleteClient(id: string): Promise<void> {
		const client = await ClientRepository.findOneBy({ id });
		if (!client) {
			throw new Error("Cliente não encontrado.");
		}

		await ClientRepository.remove(client);
	}
}
