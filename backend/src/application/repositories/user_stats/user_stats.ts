import { PrismaClient } from "@prisma/client";

import { IUserStatsRepository } from "../../../domain/interfaces/repositories/user_stats/user_stats";
import { IUserStatEntity } from "../../../domain/entities/user_stats/user_stats";
import { ICreateUserStatDTO, IUpdateUserStatDTO } from "../../../domain/entities/user_stats/dto/user_stats_dto";

/**
 * Prisma implementation of the user_stats repository.
 *
 * @class
 * @implements {IUserStatCategoriesRepository}
 */
export class UserStatCategoriesRepository implements IUserStatsRepository {
    /**
     * Creates an instance of MaterialsRepository.
     *
     * @constructor
     * @param {PrismaClient} prisma - The Prisma client instance.
     */
    constructor(
        private prisma: PrismaClient,
    ) { }


    /**
     * Finds a user_stat by ID.
     *
     * @async
     * @param {number} id - The ID of the user_stat to find.
     * @returns {Promise<IUserStatInRequestDTO | null>} The found user_stat or null.
     */
    async findById(user_id: string): Promise<IUserStatEntity | null> {
        const user_stat = await this.prisma.user_stats.findFirst({
            where: { user_id: user_id },
            select: {
                user_id: true,
                streak_days: true,
                total_xp: true,
                created_at: true,
            },
        });

        if (!user_stat) return null;

        return {
            user_id: user_stat.user_id,
            streak_days: user_stat.streak_days,
            total_xp: user_stat.total_xp,
            created_at: user_stat.created_at,
        };
    }

    /**
     * Finds a materi by slug.
     *
     * @async
     * @param {string} slug - The slug to search for.
     * @returns {Promise<IUserStatInRequestDTO | unknown>} The found materi or undefined.
     */
    async findAll(): Promise<IUserStatEntity[]> {
        const perPage = 10;
        const pageNumber = 1;

        const user_stats = await this.prisma.user_stats.findMany({
            take: perPage,
            skip: Math.ceil((pageNumber - 1) * perPage),
            orderBy: {
                user_id: "asc",
            },
            select: {
                user_id: true,
                streak_days: true,
                total_xp: true,
                created_at: true,
            },
        });

        return user_stats;
    }

    /**
     * Creates a new material.
     *
     * @async
     * @param {ICreateMaterialDTO} data - The user_stat data.
     * @returns {Promise<IUserStatOutRequestDTO>} The created user_stat.
     */
    async create({
        user_id,
        streak_days,
        total_xp,
    }: ICreateUserStatDTO): Promise<IUserStatEntity> {
        const now = new Date();
        const wordRepo = await this.prisma.user_stats.create({
            data: {
                user_id: user_id,
                streak_days: streak_days,
                total_xp: total_xp,
                created_at: now,
            },
            select: {
                user_id: true,
                streak_days: true,
                total_xp: true,
                created_at: true,
            },
        });

        return wordRepo;
    }

    /**
     * Updates a user_stat with new data.
     *
     * @async
     * @param {IUserStatOutRequestDTO} user_stat - The user_stat to update.
     * @param {IUpdateUserStatRequestDTO} data - The updated user_stat data.
     * @returns {Promise<IUserStatOutRequestDTO>} The updated user_stat.
     */
    async update(user_id: string, data: IUpdateUserStatDTO): Promise<IUserStatEntity> {
        const wordUpdated = await this.prisma.user_stats.update({
            where: {
                user_id: user_id,
            },
            data: {
                user_id: data.user_id,
                streak_days: data.streak_days,
                total_xp: data.total_xp,
            },
            select: {
                user_id: true,
                streak_days: true,
                total_xp: true,
                created_at: true,
            },
        });

        return wordUpdated;
    }

    /**
     * Deletes a user_stat by ID.
     *
     * @async
     * @param {string} id - The ID of the user_stat to delete.
     * @returns {Promise<void>} A Promise that resolves once the user_stat is deleted.
     */
    async delete(user_id: string): Promise<void> {
        await this.prisma.user_stats.delete({
            where: {
                user_id,
            },
            select: {
                user_id: true,
            },
        });
    }
}
