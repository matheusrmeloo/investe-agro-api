import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import { Client } from "./Client";

@Entity("observations")
export class Observation {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "text" })
	text!: string;

	@CreateDateColumn({ type: "timestamptz" })
	created_at!: Date;

	@ManyToOne(() => Client, (client) => client.observations, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "client_id" })
	client!: Client;
}
