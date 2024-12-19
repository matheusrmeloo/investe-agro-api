import { Address } from "../entities/Address";
import { Client } from "../entities/Client";
import { AddressRepository } from "../repositories/AddressRepository";
import { NeighborhoodRepository } from "../repositories/NeighborhoodRepository";

export class AddressService {
	static async createOrUpdateAddress(
		client: Client,
		data: Partial<Address>,
	): Promise<Address> {
		const neighborhood = await NeighborhoodRepository.findOneBy({
			id: data?.neighborhood?.id,
		});
		if (!neighborhood) {
			throw new Error("Invalid neighborhood_id");
		}

		let address = await AddressRepository.findOne({ where: { client } });
		if (!address) {
			address = AddressRepository.create({ ...data, client, neighborhood });
		} else {
			AddressRepository.merge(address, { ...data, neighborhood });
		}

		return await AddressRepository.save(address);
	}

	static async getAddressByClient(clientId: number): Promise<Address> {
		return await AddressRepository.findOne({
			where: { client: { id: clientId } },
			relations: ["neighborhood"],
		});
	}
}
