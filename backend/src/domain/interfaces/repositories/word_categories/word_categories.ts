import { ICreateWordCategoryDTO, IUpdateWordCategoryDTO } from "../../../entities/word_categories/dto/word_categories_dto";
import { IWordCategoryEntity } from "../../../entities/word_categories/word_categories";

/**
 * Interface for the repository handling word_category data.
 *
 * @interface
 */
export interface IWordCategoriesRepository {
    /**
     * Get a word_category by its ID.
     *
     * @param {number} id - The ID of the word_category.
     * @returns {Promise<IWordCategoryEntity | null>} A promise that resolves with the word_category entity or null.
     */
    findById(id: number): Promise<IWordCategoryEntity | null>;

    /**
     * Get all word_categorys.
     *
     * @returns {Promise<IWordCategoryEntity[]>} A promise that resolves with an array of word_category entities.
     */
    findAll(): Promise<IWordCategoryEntity[]>;

    /**
     * Create a new word_category.
     *
     * @param {ICreateWordCategoryDTO} data - The data for creating the word_category.
     * @returns {Promise<IWordCategoryEntity>} A promise that resolves with the created word_category entity.
     */
    create(data: ICreateWordCategoryDTO): Promise<IWordCategoryEntity>;

    /**
     * Update an existing word_category.
     * @param {number} id - The ID of the word_category to update.
     * @param {IUpdateWordCategoryDTO} data - The updated word_category data.
     * @returns {Promise<IWordCategoryEntity>} A promise that resolves with the updated word_category entity.
     */
    update(id: number, data: IUpdateWordCategoryDTO): Promise<IWordCategoryEntity>;

    /** * Delete a word_category by its ID.
   *
   * @param {number} id - The ID of the word_category to delete.
   * @returns {Promise<void>} A promise that resolves when the word_category is deleted.
   */
    // Delete a word_category
    delete(id: number): Promise<void>;
}

