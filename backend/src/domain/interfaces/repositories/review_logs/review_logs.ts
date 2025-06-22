import { ICreateReviewLogDTO, IUpdateReviewLogDTO } from "../../../entities/review_logs/dto/review_logs_dto";
import { IReviewLogEntity } from "../../../entities/review_logs/review_logs";

/**
 * Interface for the repository handling review_log data.
 *
 * @interface
 */
export interface IReviewLogsRepository {
    /**
     * Get a review_log by its ID.
     *
     * @param {number} id - The ID of the review_log.
     * @returns {Promise<IReviewLogEntity | null>} A promise that resolves with the review_log entity or null.
     */
    findById(id: number): Promise<IReviewLogEntity | null>;

    /**
     * Get all review_logs.
     *
     * @returns {Promise<IReviewLogEntity[]>} A promise that resolves with an array of review_log entities.
     */
    findAll(): Promise<IReviewLogEntity[]>;

    /**
     * Create a new review_log.
     *
     * @param {ICreateReviewLogDTO} data - The data for creating the review_log.
     * @returns {Promise<IReviewLogEntity>} A promise that resolves with the created review_log entity.
     */
    create(data: ICreateReviewLogDTO): Promise<IReviewLogEntity>;

    /**
     * Update an existing review_log.
     * @param {number} id - The ID of the review_log to update.
     * @param {IUpdateReviewLogDTO} data - The updated review_log data.
     * @returns {Promise<IReviewLogEntity>} A promise that resolves with the updated review_log entity.
     */
    update(id: number, data: IUpdateReviewLogDTO): Promise<IReviewLogEntity>;

    /** * Delete a review_log by its ID.
   *
   * @param {number} id - The ID of the review_log to delete.
   * @returns {Promise<void>} A promise that resolves when the review_log is deleted.
   */
    // Delete a review_log
    delete(id: number): Promise<void>;
}

