import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./Client";

@Entity("productions")
export class Production {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => Client, (client) => client.productions, {
		onDelete: "CASCADE",
	})
	client!: Client;

	@Column({ type: "enum", enum: ["pecuaria", "milho", "outros"] })
	type!: string;

	@Column({ nullable: true })
	custom_type?: string;
}
