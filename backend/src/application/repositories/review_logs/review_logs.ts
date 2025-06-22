import { PrismaClient } from "@prisma/client";

import { IReviewLogsRepository } from "../../../domain/interfaces/repositories/review_logs/review_logs";
import { IReviewLogEntity } from "../../../domain/entities/review_logs/review_logs";
import { ICreateReviewLogDTO, IUpdateReviewLogDTO } from "../../../domain/entities/review_logs/dto/review_logs_dto";

/**
 * Prisma implementation of the review_logs repository.
 *
 * @class
 * @implements {IReviewLogCategoriesRepository}
 */
export class ReviewLogCategoriesRepository implements IReviewLogsRepository {
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
     * Finds a review_log by ID.
     *
     * @async
     * @param {number} id - The ID of the review_log to find.
     * @returns {Promise<IReviewLogInRequestDTO | null>} The found review_log or null.
     */
    async findById(id: number): Promise<IReviewLogEntity | null> {
        const review_log = await this.prisma.review_logs.findFirst({
            where: { id },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                result: true,
                timestamp: true,
                created_at: true,
            },
        });

        if (!review_log) return null;

        return {
            id: review_log.id,
            user_id: review_log.user_id,
            word_id: review_log.word_id,
            result: review_log.result,
            timestamp: review_log.timestamp,
            created_at: review_log.created_at,
        };
    }

    /**
     * Finds a materi by slug.
     *
     * @async
     * @param {string} slug - The slug to search for.
     * @returns {Promise<IReviewLogInRequestDTO | unknown>} The found materi or undefined.
     */
    async findAll(): Promise<IReviewLogEntity[]> {
        const perPage = 10;
        const pageNumber = 1;

        const review_logs = await this.prisma.review_logs.findMany({
            take: perPage,
            skip: Math.ceil((pageNumber - 1) * perPage),
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                result: true,
                timestamp: true,
                created_at: true,
            },
        });

        return review_logs;
    }

    /**
     * Creates a new material.
     *
     * @async
     * @param {ICreateMaterialDTO} data - The review_log data.
     * @returns {Promise<IReviewLogOutRequestDTO>} The created review_log.
     */
    async create({
        user_id,
        word_id,
        result,
        timestamp,
    }: ICreateReviewLogDTO): Promise<IReviewLogEntity> {
        const now = new Date();
        const wordRepo = await this.prisma.review_logs.create({
            data: {
                user_id: user_id,
                word_id: word_id,
                result: result,
                timestamp: timestamp,
                created_at: now,
            },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                result: true,
                timestamp: true,
                created_at: true,
            },
        });

        return wordRepo;
    }

    /**
     * Updates a review_log with new data.
     *
     * @async
     * @param {IReviewLogOutRequestDTO} review_log - The review_log to update.
     * @param {IUpdateReviewLogRequestDTO} data - The updated review_log data.
     * @returns {Promise<IReviewLogOutRequestDTO>} The updated review_log.
     */
    async update(id: number, data: IUpdateReviewLogDTO): Promise<IReviewLogEntity> {
        const wordUpdated = await this.prisma.review_logs.update({
            where: {
                id: id,
            },
            data: {
                user_id: data.user_id,
                word_id: data.word_id,
                result: data.result,
                timestamp: data.timestamp,
            },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                result: true,
                timestamp: true,
                created_at: true,
            },
        });

        return wordUpdated;
    }

    /**
     * Deletes a review_log by ID.
     *
     * @async
     * @param {string} id - The ID of the review_log to delete.
     * @returns {Promise<void>} A Promise that resolves once the review_log is deleted.
     */
    async delete(id: number): Promise<void> {
        await this.prisma.review_logs.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
    }
}
