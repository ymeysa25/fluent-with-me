import { ICreateUserFlashcardDTO, IUpdateUserFlashcardDTO } from "../../../entities/user_flashcards/dto/user_flashcards_dto";
import { IUserFlashcardEntity } from "../../../entities/user_flashcards/user_flashcards";

/**
 * Interface for the repository handling user_flashcard data.
 *
 * @interface
 */
export interface IUserFlashcardsRepository {
    /**
     * Get a user_flashcard by its ID.
     *
     * @param {number} id - The ID of the user_flashcard.
     * @returns {Promise<IUserFlashcardEntity | null>} A promise that resolves with the user_flashcard entity or null.
     */
    findById(id: number): Promise<IUserFlashcardEntity | null>;

    /**
     * Get all user_flashcards.
     *
     * @returns {Promise<IUserFlashcardEntity[]>} A promise that resolves with an array of user_flashcard entities.
     */
    findAll(): Promise<IUserFlashcardEntity[]>;

    /**
     * Create a new user_flashcard.
     *
     * @param {ICreateUserFlashcardDTO} data - The data for creating the user_flashcard.
     * @returns {Promise<IUserFlashcardEntity>} A promise that resolves with the created user_flashcard entity.
     */
    create(data: ICreateUserFlashcardDTO): Promise<IUserFlashcardEntity>;

    /**
     * Update an existing user_flashcard.
     * @param {number} id - The ID of the user_flashcard to update.
     * @param {IUpdateUserFlashcardDTO} data - The updated user_flashcard data.
     * @returns {Promise<IUserFlashcardEntity>} A promise that resolves with the updated user_flashcard entity.
     */
    update(id: number, data: IUpdateUserFlashcardDTO): Promise<IUserFlashcardEntity>;

    /** * Delete a user_flashcard by its ID.
   *
   * @param {number} id - The ID of the user_flashcard to delete.
   * @returns {Promise<void>} A promise that resolves when the user_flashcard is deleted.
   */
    // Delete a user_flashcard
    delete(id: number): Promise<void>;
}

