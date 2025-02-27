import { Operation } from "../entities/Operation";
import { OperationRepository } from "../repositories/OperationRepository";
import { ClientRepository } from "../repositories/ClientRepository";
import { ProductionRepository } from "../repositories/ProductionRepository";
import { AppDataSource } from "../config/database";
import { NotFoundError } from "../utils/errors/NotFoundError";

export class OperationService {
    /**
     * Cria uma nova operação.
     */
    public static async createOperation(data: Partial<Operation>): Promise<Operation> {
        const queryRunner = AppDataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const client = await ClientRepository.findOneBy({ id: data?.client?.id });
            if (!client) {
                throw new NotFoundError("Cliente não encontrado.");
            }

            const production = await ProductionRepository.findOneBy({ id: data?.production?.id });
            if (!production) {
                throw new NotFoundError("Produção não encontrada.");
            }

            const operation = OperationRepository.create({
                ...data,
                client,
                production,
            });

            const savedOperation = await queryRunner.manager.save(operation);
            await queryRunner.commitTransaction();

            return savedOperation;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Lista todas as operações com filtros opcionais.
     */
    public static async getAllOperations(
        filters: any,
        page: number = 1,
        size: number = 10
    ): Promise<{ operations: Operation[]; total: number }> {
        const where: any = {};

        if (filters.client_id) {
            where.client = { id: filters.client_id };
        }

        if (filters.production_id) {
            where.production = { id: filters.production_id };
        }

        if (filters.deleted !== undefined) {
            where.deleted = filters.deleted;
        }

        const [operations, total] = await OperationRepository.findAndCount({
            where,
            relations: ["client", "production"],
            order: { created_at: "DESC" },
            skip: (page - 1) * size,
            take: size,
        });

        return { operations, total };
    }

    /**
     * Busca uma operação por ID.
     */
    public static async getOperationById(id: string): Promise<Operation> {
        const operation = await OperationRepository.findOne({
            where: { id },
            relations: ["client", "production"],
        });

        if (!operation) {
            throw new NotFoundError("Operação não encontrada.");
        }

        return operation;
    }

    /**
     * Atualiza uma operação.
     */
    public static async updateOperation(id: string, data: Partial<Operation>): Promise<Operation> {
        const queryRunner = AppDataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const operation = await OperationRepository.findOneBy({ id });
            if (!operation) {
                throw new NotFoundError("Operação não encontrada.");
            }

            // Atualiza os dados da operação
            OperationRepository.merge(operation, data);
            const updatedOperation = await queryRunner.manager.save(operation);
            await queryRunner.commitTransaction();
            return updatedOperation;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Remove uma operação (soft delete).
     */
    public static async deleteOperation(id: string): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const operation = await OperationRepository.findOneBy({ id });
            if (!operation) {
                throw new NotFoundError("Operação não encontrada.");
            }

            operation.deleted = true;
            await queryRunner.manager.save(operation);
            await queryRunner.commitTransaction();

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}