import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { Production } from "./Production";

@Entity("operations")
export class Operation {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => Client, (client) => client.operations, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "client_id" })
	client!: Client;

	@ManyToOne(() => Production, (production) => production.operations, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "production_id" })
	production!: Production;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@Column({default: false})
	deleted!: Boolean;

	@Column({ type: "text", nullable: true })
	observation?: string;

	@Column({ type: "int" })
	land_area?: number;

	@Column({
		type: "enum",
		enum: ["m2", "tarefa", "hectare"],
	})
	measurement_land_area?: string;
	
	@Column({ type: "int" })
	production_area?: number;

	@Column({
		type: "enum",
		enum: ["m2", "tarefa", "hectare"],
	})
	measurement_production_area?: string;

	@Column({ type: "int" })
	plowed_area!: number;

	@Column({
		type: "enum",
		enum: ["m2", "tarefa", "hectare"],
	})
	measurement_plowed_area?: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	agricultural_production?: number;

	@Column({
		type: "enum",
		enum: ["g", "kg", "t"],
	})
	measurement_agricultural_production?: string;
}