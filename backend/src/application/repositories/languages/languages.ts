import { PrismaClient } from "@prisma/client";

import { ILanguagesRepository } from "../../../domain/interfaces/repositories/languages/languages";
import { ILanguageEntity } from "../../../domain/entities/languages/languages";
import { ICreateLanguageDTO, IUpdateLanguageDTO } from "../../../domain/entities/languages/dto/languages_dto";

/**
 * Prisma implementation of the languages repository.
 *
 * @class
 * @implements {ILanguagesRepository}
 */
export class LanguagesRepository implements ILanguagesRepository {
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
     * Finds a language by ID.
     *
     * @async
     * @param {number} id - The ID of the language to find.
     * @returns {Promise<ILanguageInRequestDTO | null>} The found language or null.
     */
    async findById(id: number): Promise<ILanguageEntity | null> {
        const language = await this.prisma.languages.findFirst({
            where: { id },
            select: {
                id: true,
                code: true,
                name: true,
                created_at: true,
            },
        });

        if (!language) return null;

        return {
            id: language.id,
            code: language.code,
            name: language.name,
            created_at: language.created_at
        };
    }

    /**
     * Finds a materi by slug.
     *
     * @async
     * @param {string} slug - The slug to search for.
     * @returns {Promise<ILanguageInRequestDTO | unknown>} The found materi or undefined.
     */
    async findAll(): Promise<ILanguageEntity[]> {
        const perPage = 10;
        const pageNumber = 1;

        const languages = await this.prisma.languages.findMany({
            take: perPage,
            skip: Math.ceil((pageNumber - 1) * perPage),
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
                code: true,
                name: true,
                created_at: true,
            },
        });

        return languages;
    }

    /**
     * Creates a new material.
     *
     * @async
     * @param {ICreateMaterialDTO} data - The language data.
     * @returns {Promise<ILanguageOutRequestDTO>} The created language.
     */
    async create({
        code,
        name,
    }: ICreateLanguageDTO): Promise<ILanguageEntity> {
        const now = new Date();
        const language = await this.prisma.languages.create({
            data: {
                code,
                name,
                created_at: now,
            },
            select: {
                id: true,
                code: true,
                name: true,
                created_at: true,
            },
        });

        return language;
    }

    /**
     * Updates a language with new data.
     *
     * @async
     * @param {ILanguageOutRequestDTO} language - The language to update.
     * @param {IUpdateLanguageRequestDTO} data - The updated language data.
     * @returns {Promise<ILanguageOutRequestDTO>} The updated language.
     */
    async update(id: number, data: IUpdateLanguageDTO): Promise<ILanguageEntity> {
        const languageUpdated = await this.prisma.languages.update({
            where: {
                id: id,
            },
            data: {
                code : data.code,
                name : data.name
            },
            select: {
                id: true,
                code: true,
                name: true,
                created_at: true,
            },
        });

        return languageUpdated;
    }

    /**
     * Deletes a language by ID.
     *
     * @async
     * @param {string} id - The ID of the language to delete.
     * @returns {Promise<void>} A Promise that resolves once the language is deleted.
     */
    async delete(id: number): Promise<void> {
        await this.prisma.languages.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
    }
}
