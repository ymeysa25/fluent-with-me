import { ICreateWordDTO, IGetWordsDTO, IUpdateWordDTO } from "../../../entities/words/dto/words_dto";
import { IWordEntity } from "../../../entities/words/words";

/**
 * Interface for the repository handling word data.
 *
 * @interface
 */
export interface IWordsRepository {
    /**
     * Get a word by its ID.
     *
     * @param {number} id - The ID of the word.
     * @returns {Promise<IWordEntity | null>} A promise that resolves with the word entity or null.
     */
    findById(id: number): Promise<IWordEntity | null>;

    /**
     * Get all word.
     *
     * @returns {Promise<IWordEntity[]>} A promise that resolves with an array of word entities.
     */
    findAll(data: IGetWordsDTO): Promise<IWordEntity[]>;

    /**
     * Create a new word.
     *
     * @param {ICreateWordDTO} data - The data for creating the word.
     * @returns {Promise<IWordEntity>} A promise that resolves with the created word entity.
     */
    create(data: ICreateWordDTO): Promise<IWordEntity>;

    /**
     * Update an existing word.
     * @param {number} id - The ID of the word to update.
     * @param {IUpdateWordDTO} data - The updated word data.
     * @returns {Promise<IWordEntity>} A promise that resolves with the updated word entity.
     */
    update(id: number, data: IUpdateWordDTO): Promise<IWordEntity>;

    /** * Delete a word by its ID.
   *
   * @param {number} id - The ID of the word to delete.
   * @returns {Promise<void>} A promise that resolves when the word is deleted.
   */
    // Delete a word
    delete(id: number): Promise<void>;
}

