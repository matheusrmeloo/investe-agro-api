import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Client } from "./Client";
import { Operation } from "./Operation";

@Entity("productions")
export class Production {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => Client, (client) => client.productions, {
		onDelete: "CASCADE",
	})
	client!: Client;

	@Column({
		type: "enum",
		enum: ["pecuaria", "milho", "mandioca", "fumo", "batata doce", "trator", "outros"],
	})
	type!: string;

	@Column({ nullable: true })
	custom_type?: string;

	@OneToMany(() => Operation, (operation) => operation.production, {
		cascade: true,
	})
	operations?: Operation[];
}