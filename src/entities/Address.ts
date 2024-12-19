import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToOne,
} from "typeorm";
import { Client } from "./Client";
import { Neighborhood } from "./Neighborhood";

@Entity("addresses")
export class Address {
	@PrimaryGeneratedColumn("uuid")
	id!: number;

	@OneToOne(() => Client, (client) => client.address, { onDelete: "CASCADE" })
	@JoinColumn({ name: "client_id" })
	client!: Client;

	@Column()
	cep!: string;

	@Column()
	street!: string;

	@Column({ nullable: true })
	number!: string;

	@Column({ nullable: true })
	complement?: string;

	@ManyToOne(() => Neighborhood, (neighborhood) => neighborhood.addresses)
	@JoinColumn({ name: "neighborhood_id" })
	neighborhood!: Neighborhood;
}
