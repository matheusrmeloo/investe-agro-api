import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./Client";

@Entity("spouses")
export class Spouse {
	@PrimaryGeneratedColumn("uuid")
	id!: number;

	@ManyToOne(() => Client, (client) => client.spouses, { onDelete: "CASCADE" })
	client!: Client;

	@Column()
	name!: string;

	@Column({ unique: true })
	document_number!: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ type: "date" })
	birth_date?: Date;
}
