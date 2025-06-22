import { PrismaClient } from "@prisma/client";

import { IWordCategoriesRepository } from "../../../domain/interfaces/repositories/word_categories/word_categories";
import { IWordCategoryEntity } from "../../../domain/entities/word_categories/word_categories";
import { ICreateWordCategoryDTO, IUpdateWordCategoryDTO } from "../../../domain/entities/word_categories/dto/word_categories_dto";

/**
 * Prisma implementation of the word_categories repository.
 *
 * @class
 * @implements {WordCategoryRepository}
 */
export class WordCategoryRepository implements IWordCategoriesRepository {
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
     * Finds a word_categorie by ID.
     *
     * @async
     * @param {number} id - The ID of the word_categorie to find.
     * @returns {Promise<IWordCategoryInRequestDTO | null>} The found word_categorie or null.
     */
    async findById(id: number): Promise<IWordCategoryEntity | null> {
        const word_categorie = await this.prisma.word_categories.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                created_at: true,
            },
        });

        if (!word_categorie) return null;

        return {
            id: word_categorie.id,
            name: word_categorie.name,
            created_at: word_categorie.created_at
        };
    }

    /**
     * Finds a materi by slug.
     *
     * @async
     * @param {string} slug - The slug to search for.
     * @returns {Promise<IWordCategoryInRequestDTO | unknown>} The found materi or undefined.
     */
    async findAll(): Promise<IWordCategoryEntity[]> {
        // const perPage = 10;
        // const pageNumber = 1;

        const word_categories = await this.prisma.word_categories.findMany({
            // take: perPage,
            // skip: Math.ceil((pageNumber - 1) * perPage),
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
                name: true,
                created_at: true,
            },
        });

        return word_categories;
    }

    /**
     * Creates a new material.
     *
     * @async
     * @param {ICreateMaterialDTO} data - The word_categorie data.
     * @returns {Promise<IWordCategoryOutRequestDTO>} The created word_categorie.
     */
    async create({
        name,
    }: ICreateWordCategoryDTO): Promise<IWordCategoryEntity> {
        const now = new Date();
        const wordRepo = await this.prisma.word_categories.create({
            data: {
                name: name,
                created_at: now,
            },
            select: {
                id: true,
                name: true,
                created_at: true,
            },
        });

        return wordRepo;
    }

    /**
     * Updates a word_categorie with new data.
     *
     * @async
     * @param {IWordCategoryOutRequestDTO} word_categorie - The word_categorie to update.
     * @param {IUpdateWordCategoryRequestDTO} data - The updated word_categorie data.
     * @returns {Promise<IWordCategoryOutRequestDTO>} The updated word_categorie.
     */
    async update(id: number, data: IUpdateWordCategoryDTO): Promise<IWordCategoryEntity> {
        const wordUpdated = await this.prisma.word_categories.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
            },
            select: {
                id: true,
                name: true,
                created_at: true,
            },
        });

        return wordUpdated;
    }

    /**
     * Deletes a word_categorie by ID.
     *
     * @async
     * @param {string} id - The ID of the word_categorie to delete.
     * @returns {Promise<void>} A Promise that resolves once the word_categorie is deleted.
     */
    async delete(id: number): Promise<void> {
        await this.prisma.word_categories.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
    }
}
