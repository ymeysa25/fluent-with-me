import { ICreateUserStatDTO, IUpdateUserStatDTO,  } from "../../../entities/user_stats/dto/user_stats_dto";
import { IUserStatEntity } from "../../../entities/user_stats/user_stats";

/**
 * Interface for the repository handling user_stat data.
 *
 * @interface
 */
export interface IUserStatsRepository {
    /**
     * Get a user_stat by its ID.
     *
     * @param {number} id - The ID of the user_stat.
     * @returns {Promise<IUserStatEntity | null>} A promise that resolves with the user_stat entity or null.
     */
    findById(user_id: string): Promise<IUserStatEntity | null>;

    /**
     * Get all user_stats.
     *
     * @returns {Promise<IUserStatEntity[]>} A promise that resolves with an array of user_stat entities.
     */
    findAll(): Promise<IUserStatEntity[]>;

    /**
     * Create a new user_stat.
     *
     * @param {ICreateUserStatDTO} data - The data for creating the user_stat.
     * @returns {Promise<IUserStatEntity>} A promise that resolves with the created user_stat entity.
     */
    create(data: ICreateUserStatDTO): Promise<IUserStatEntity>;

    /**
     * Update an existing user_stat.
     * @param {number} id - The ID of the user_stat to update.
     * @param {IUpdateUserStatDTO} data - The updated user_stat data.
     * @returns {Promise<IUserStatEntity>} A promise that resolves with the updated user_stat entity.
     */
    update(id: string, data: IUpdateUserStatDTO): Promise<IUserStatEntity>;

    /** * Delete a user_stat by its ID.
   *
   * @param {number} id - The ID of the user_stat to delete.
   * @returns {Promise<void>} A promise that resolves when the user_stat is deleted.
   */
    // Delete a user_stat
    delete(id: string): Promise<void>;
}

