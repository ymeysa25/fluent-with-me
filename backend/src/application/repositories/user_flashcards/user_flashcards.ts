import { PrismaClient } from "@prisma/client";

import { IUserFlashcardsRepository } from "../../../domain/interfaces/repositories/user_flashcards/user_flashcards";
import { IUserFlashcardEntity } from "../../../domain/entities/user_flashcards/user_flashcards";
import { ICreateUserFlashcardDTO, IUpdateUserFlashcardDTO } from "../../../domain/entities/user_flashcards/dto/user_flashcards_dto";

/**
 * Prisma implementation of the user_flashcards repository.
 *
 * @class
 * @implements {IUserFlashcardCategoriesRepository}
 */
export class UserFlashcardCategoriesRepository implements IUserFlashcardsRepository {
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
     * Finds a user_flashcard by ID.
     *
     * @async
     * @param {number} id - The ID of the user_flashcard to find.
     * @returns {Promise<IUserFlashcardInRequestDTO | null>} The found user_flashcard or null.
     */
    async findById(id: number): Promise<IUserFlashcardEntity | null> {
        const user_flashcard = await this.prisma.user_flashcards.findFirst({
            where: { id },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                next_review_at: true,
                interval_ms: true,
                repetitions: true,
                ease_factor: true,
                remembered: true,
                last_reviewed: true,
                created_at: true,
            },
        });

        if (!user_flashcard) return null;

        return {
            id: user_flashcard.id,
            user_id: user_flashcard.user_id,
            word_id: user_flashcard.word_id,
            next_review_at: user_flashcard.next_review_at,
            interval_ms: user_flashcard.interval_ms,
            repetitions: user_flashcard.repetitions,
            ease_factor: user_flashcard.ease_factor,
            remembered: user_flashcard.remembered,
            last_reviewed: user_flashcard.last_reviewed,
            created_at: user_flashcard.created_at,
        };
    }

    /**
     * Finds a materi by slug.
     *
     * @async
     * @param {string} slug - The slug to search for.
     * @returns {Promise<IUserFlashcardInRequestDTO | unknown>} The found materi or undefined.
     */
    async findAll(): Promise<IUserFlashcardEntity[]> {
        const perPage = 10;
        const pageNumber = 1;

        const user_flashcards = await this.prisma.user_flashcards.findMany({
            take: perPage,
            skip: Math.ceil((pageNumber - 1) * perPage),
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                next_review_at: true,
                interval_ms: true,
                repetitions: true,
                ease_factor: true,
                remembered: true,
                last_reviewed: true,
                created_at: true,
            },
        });

        return user_flashcards;
    }

    /**
     * Creates a new material.
     *
     * @async
     * @param {ICreateMaterialDTO} data - The user_flashcard data.
     * @returns {Promise<IUserFlashcardOutRequestDTO>} The created user_flashcard.
     */
    async create({
        user_id,
        word_id,
        next_review_at,
        interval_ms,
        repetitions,
        ease_factor,
        remembered,
        last_reviewed,
    }: ICreateUserFlashcardDTO): Promise<IUserFlashcardEntity> {
        const now = new Date();
        const wordRepo = await this.prisma.user_flashcards.create({
            data: {
                user_id: user_id,
                word_id: word_id,
                next_review_at: next_review_at,
                interval_ms: interval_ms,
                repetitions: repetitions,
                ease_factor: ease_factor,
                remembered: remembered,
                last_reviewed: last_reviewed,
                created_at: now,
            },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                next_review_at: true,
                interval_ms: true,
                repetitions: true,
                ease_factor: true,
                remembered: true,
                last_reviewed: true,
                created_at: true,
            },
        });

        return wordRepo;
    }

    /**
     * Updates a user_flashcard with new data.
     *
     * @async
     * @param {IUserFlashcardOutRequestDTO} user_flashcard - The user_flashcard to update.
     * @param {IUpdateUserFlashcardRequestDTO} data - The updated user_flashcard data.
     * @returns {Promise<IUserFlashcardOutRequestDTO>} The updated user_flashcard.
     */
    async update(id: number, data: IUpdateUserFlashcardDTO): Promise<IUserFlashcardEntity> {
        const wordUpdated = await this.prisma.user_flashcards.update({
            where: {
                id: id,
            },
            data: {
                user_id: data.user_id,
                word_id: data.word_id,
                next_review_at: data.next_review_at,
                interval_ms: data.interval_ms,
                repetitions: data.repetitions,
                ease_factor: data.ease_factor,
                remembered: data.remembered,
                last_reviewed: data.last_reviewed,
            },
            select: {
                id: true,
                user_id: true,
                word_id: true,
                next_review_at: true,
                interval_ms: true,
                repetitions: true,
                ease_factor: true,
                remembered: true,
                last_reviewed: true,
                created_at: true,
            },
        });

        return wordUpdated;
    }

    /**
     * Deletes a user_flashcard by ID.
     *
     * @async
     * @param {string} id - The ID of the user_flashcard to delete.
     * @returns {Promise<void>} A Promise that resolves once the user_flashcard is deleted.
     */
    async delete(id: number): Promise<void> {
        await this.prisma.user_flashcards.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
    }
}
