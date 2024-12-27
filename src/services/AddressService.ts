import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";
import { NeighborhoodRepository } from "../repositories/NeighborhoodRepository";
import { Client } from "../entities/Client";

export class AddressService {
	static async createAddress(data: any): Promise<Address> {
		const neighborhood = await NeighborhoodRepository.findOneBy({
			id: data?.neighborhood?.id,
		});
		if (!neighborhood) {
			throw new Error("Invalid neighborhood_id");
		}

		const address = new Address();
		address.cep = data.cep;
		address.street = data.street;
		address.number = data.number;
		address.complement = data.complement;
		address.neighborhood = neighborhood;

		return await AddressRepository.save(address);
	}

	static async getAddressById(id: string): Promise<Address> {
		const address = await AddressRepository.findOne({
			where: { id },
			relations: ["neighborhood", "clients"],
		});

		if (!address) {
			throw new Error("Address not found for the given id.");
		}

		return address;
	}
}
