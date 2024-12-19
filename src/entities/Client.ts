import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Spouse } from "./Spouse";
import { Production } from "./Production";

@Entity("clients")
export class Client {
	@PrimaryGeneratedColumn("uuid")
	id!: number;

	@Column({ type: "varchar", length: 255 })
	name!: string;

	@Column({ unique: true })
	document_number!: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	email?: string;

	@Column({ type: "text", nullable: true })
	address?: string;

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
}
