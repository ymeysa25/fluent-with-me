export interface IReviewLogEntity {
    id: number;
    user_id: string; // UUID
    word_id: number;
    result: boolean; // true = remembered
    timestamp: Date; // Timestamp of the review
    created_at: Date;
}

