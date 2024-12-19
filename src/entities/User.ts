import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: number;

	@Column({ type: "varchar", length: 255 }) // Especificando o tipo da coluna
	name!: string;

	@Column({ type: "varchar", unique: true })
	email!: string;

	@Column({ type: "varchar" })
	password!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@Column({ type: "enum", enum: ["admin", "user"], default: "user" })
	role!: "admin" | "user";
}
