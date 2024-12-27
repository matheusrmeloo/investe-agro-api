import { Address } from "../entities/Address";
import { Production } from "../entities/Production";
import { Spouse } from "../entities/Spouse";

export interface CreateClientDTO {
	name: string;
	document_number: string;
	phone?: string;
	email?: string;
	birth_date?: Date;
	social_status?: string;
	spouses?: Spouse[];
	productions?: Production[];
	address?: Address;
}
