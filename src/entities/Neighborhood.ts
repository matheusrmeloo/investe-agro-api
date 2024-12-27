import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Address } from "./Address";

@Entity("neighborhoods")
export class Neighborhood {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true })
	name!: string;

	@Column()
	city!: string;

	@Column({ length: 2 })
	state!: string;

	@OneToMany(() => Address, (address) => address.neighborhood)
	addresses?: Address[];
}
