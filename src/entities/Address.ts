import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Client } from "./Client";
import { Neighborhood } from "./Neighborhood";

@Entity("addresses")
export class Address {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

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

	@OneToMany(() => Client, (client) => client.address)
	clients?: Client[];
}
