export interface IUserFlashcardEntity {
    id: number;
    user_id: string; // UUID
    word_id: number;
    next_review_at: Date; // TIMESTAMP
    interval_ms: BigInt; // BIGINT
    repetitions: number; // INTEGER
    ease_factor: number; // FLOAT
    remembered: boolean; // BOOLEAN
    last_reviewed: Date; // TIMESTAMP
    created_at: Date;
}
