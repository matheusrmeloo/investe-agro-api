import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Spouse } from "./Spouse";
import { Production } from "./Production";
import { Address } from "./Address";
import { Observation } from "./Observation";

@Entity("clients")
export class Client {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 255 })
	name!: string;

	@Column({ unique: true })
	document_number!: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	email?: string;

	@Column({ type: "date", nullable: true })
	birth_date?: Date;

	@Column({ nullable: true })
	social_status?: string;

	@OneToMany(() => Spouse, (spouse) => spouse.client, { cascade: true })
	spouses?: Spouse[];

	@OneToMany(() => Production, (production) => production.client, {
		cascade: true,
	})
	productions?: Production[];

	@ManyToOne(() => Address, (address) => address.clients, { nullable: true })
	@JoinColumn({ name: "address_id" })
	address?: Address;

	@OneToMany(() => Observation, (observation) => observation.client, {
		cascade: true,
	})
	observations?: Observation[];
}
