import { ICreateLanguageDTO, IUpdateLanguageDTO } from "../../../entities/languages/dto/languages_dto";
import { ILanguageEntity } from "../../../entities/languages/languages";

/**
 * Interface for the repository handling language data.
 *
 * @interface
 */
export interface ILanguagesRepository {
    /**
     * Get a language by its ID.
     *
     * @param {number} id - The ID of the language.
     * @returns {Promise<ILanguageEntity | null>} A promise that resolves with the language entity or null.
     */
    findById(id: number): Promise<ILanguageEntity | null>;

    /**
     * Get all languages.
     *
     * @returns {Promise<ILanguageEntity[]>} A promise that resolves with an array of language entities.
     */
    findAll(): Promise<ILanguageEntity[]>;

    /**
     * Create a new language.
     *
     * @param {ICreateLanguageDTO} data - The data for creating the language.
     * @returns {Promise<ILanguageEntity>} A promise that resolves with the created language entity.
     */
    create(data: ICreateLanguageDTO): Promise<ILanguageEntity>;

    /**
     * Update an existing language.
     * @param {number} id - The ID of the language to update.
     * @param {IUpdateLanguageDTO} data - The updated language data.
     * @returns {Promise<ILanguageEntity>} A promise that resolves with the updated language entity.
     */
    update(id: number, data: IUpdateLanguageDTO): Promise<ILanguageEntity>;

    /** * Delete a language by its ID.
   *
   * @param {number} id - The ID of the language to delete.
   * @returns {Promise<void>} A promise that resolves when the language is deleted.
   */
    // Delete a language
    delete(id: number): Promise<void>;
}

