export interface ICreateReviewLogDTO {
    user_id: string; // UUID
    word_id: number;
    result: boolean; // true = remembered
    timestamp: Date; // Timestamp of the review
}

export interface IUpdateReviewLogDTO {
    user_id?: string; // UUID
    word_id?: number;
    result?: boolean; // true = remembered
    timestamp?: Date; // Timestamp of the review
}