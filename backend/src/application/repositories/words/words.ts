import { PrismaClient } from "@prisma/client";

import { IWordsRepository } from "../../../domain/interfaces/repositories/words/words";
import { IWordEntity } from "../../../domain/entities/words/words";
import { ICreateWordDTO, IUpdateWordDTO } from "../../../domain/entities/words/dto/words_dto";

/**
 * Prisma implementation of the words repository.
 *
 * @class
 * @implements {IWordsRepository}
 */
export class WordsRepository implements IWordsRepository {
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
     * Finds a word by ID.
     *
     * @async
     * @param {number} id - The ID of the word to find.
     * @returns {Promise<IWordInRequestDTO | null>} The found word or null.
     */
    async findById(id: number): Promise<IWordEntity | null> {
        const word = await this.prisma.words.findFirst({
            where: { id },
            select: {
                id: true,
                language_id: true,
                word: true,
                image_url: true,
                audio_url: true,
                translation: true,
                category_id: true,
                created_at: true,
            },
        });

        if (!word) return null;

        return {
            id: word.id,
            language_id: word.language_id,
            word: word.word,
            image_url: word.image_url,
            audio_url: word.audio_url,
            translation: word.translation,
            category_id: word.category_id,
            created_at: word.created_at
        };
    }

    /**
     * Finds a materi by slug.
     *
     * @async
     * @param {string} slug - The slug to search for.
     * @returns {Promise<IWordInRequestDTO | unknown>} The found materi or undefined.
     */
    async findAll(): Promise<IWordEntity[]> {
        const perPage = 10;
        const pageNumber = 1;

        const words = await this.prisma.words.findMany({
            take: perPage,
            skip: Math.ceil((pageNumber - 1) * perPage),
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
                language_id: true,
                word: true,
                image_url: true,
                audio_url: true,
                translation: true,
                category_id: true,
                created_at: true,
            },
        });

        return words;
    }

    /**
     * Creates a new material.
     *
     * @async
     * @param {ICreateMaterialDTO} data - The word data.
     * @returns {Promise<IWordOutRequestDTO>} The created word.
     */
    async create({
        language_id,
        word,
        image_url,
        audio_url,
        translation,
        category_id,
    }: ICreateWordDTO): Promise<IWordEntity> {
        const now = new Date();
        const wordRepo = await this.prisma.words.create({
            data: {
                language_id,
                word,
                image_url,
                audio_url,
                translation,
                category_id,
                created_at: now,
            },
            select: {
                id: true,
                language_id: true,
                word: true,
                image_url: true,
                audio_url: true,
                translation: true,
                category_id: true,
                created_at: true,
            },
        });

        return wordRepo;
    }

    /**
     * Updates a word with new data.
     *
     * @async
     * @param {IWordOutRequestDTO} word - The word to update.
     * @param {IUpdateWordRequestDTO} data - The updated word data.
     * @returns {Promise<IWordOutRequestDTO>} The updated word.
     */
    async update(id: number, data: IUpdateWordDTO): Promise<IWordEntity> {
        const wordUpdated = await this.prisma.words.update({
            where: {
                id: id,
            },
            data: {
                language_id: data.language_id,
                word: data.word,
                image_url: data.image_url,
                audio_url: data.audio_url,
                translation: data.translation,
                category_id: data.category_id,
            },
            select: {
                id: true,
                language_id: true,
                word: true,
                image_url: true,
                audio_url: true,
                translation: true,
                category_id: true,
                created_at: true,
            },
        });

        return wordUpdated;
    }

    /**
     * Deletes a word by ID.
     *
     * @async
     * @param {string} id - The ID of the word to delete.
     * @returns {Promise<void>} A Promise that resolves once the word is deleted.
     */
    async delete(id: number): Promise<void> {
        await this.prisma.words.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
    }
}
