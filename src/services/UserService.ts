import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import config from "../config/env";

/**
 * Serviço para Gerenciar Usuários
 */
export class UserService {
	/**
	 * Registra um novo usuário.
	 * @param data Dados do usuário.
	 * @returns Usuário criado.
	 */
	static async registerUser(data: Partial<User>): Promise<User> {
		const { name, email, password, role } = data;

		// Verificar se o email já está cadastrado
		const existingUser = await UserRepository.findOne({ where: { email } });
		if (existingUser) throw new Error("Email já está em uso.");

		// Criptografar senha
		const passwordHash = await bcrypt.hash(password!, 10);

		// Criar usuário
		const user = UserRepository.create({
			name,
			email,
			password: passwordHash,
			role,
		});
		return UserRepository.save(user);
	}

	/**
	 * Autentica um usuário e retorna um token JWT.
	 * @param email Email do usuário.
	 * @param password Senha do usuário.
	 * @returns Objeto contendo o usuário e o token JWT.
	 */
	static async authenticateUser(
		email: string,
		password: string,
	): Promise<{ user: User; token: string }> {
		const user = await UserRepository.findOne({ where: { email } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error("Credenciais inválidas.");
		}

		// Gerar JWT
		const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
			expiresIn: "1h",
		});
		return { user, token };
	}

	/**
	 * Atualiza os dados de um usuário.
	 * @param id ID do usuário a ser atualizado.
	 * @param data Dados a serem atualizados.
	 * @param currentUserRole Role do usuário atual.
	 * @returns Usuário atualizado.
	 */
	static async updateUser(
		id: number,
		data: Partial<User>,
		currentUserRole: string,
	): Promise<User> {
		const user = await UserRepository.findOne({ where: { id } });
		if (!user) throw new Error("Usuário não encontrado.");

		// Verificar permissões
		if (currentUserRole !== "admin" && data.role)
			throw new Error("Permissão negada para alterar role.");

		// Atualizar campos
		if (data.name !== undefined) user.name = data.name;
		if (data.email !== undefined) {
			// Verificar se o novo email já está em uso
			const existingUser = await UserRepository.findOne({
				where: { email: data.email },
			});
			if (existingUser && existingUser.id !== id)
				throw new Error("Email já está em uso.");
			user.email = data.email;
		}
		if (data.password !== undefined) {
			user.password = await bcrypt.hash(data.password, 10);
		}
		if (data.role !== undefined) {
			user.role = data.role;
		}

		return UserRepository.save(user);
	}

	/**
	 * Remove um usuário.
	 * @param id ID do usuário a ser removido.
	 */
	static async deleteUser(id: number): Promise<void> {
		const user = await UserRepository.findOne({ where: { id } });
		if (!user) throw new Error("Usuário não encontrado.");

		await UserRepository.remove(user);
	}

	/**
	 * Lista todos os usuários.
	 * @returns Lista de usuários.
	 */
	static async getAllUsers(): Promise<User[]> {
		return UserRepository.find();
	}

	/**
	 * Obtém um usuário por ID.
	 * @param id ID do usuário.
	 * @returns Usuário encontrado.
	 */
	static async getUserById(id: number): Promise<User> {
		const user = await UserRepository.findOne({ where: { id } });
		if (!user) throw new Error("Usuário não encontrado.");
		return user;
	}
}
