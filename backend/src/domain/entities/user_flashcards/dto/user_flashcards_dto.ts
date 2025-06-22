export interface ICreateUserFlashcardDTO {
    user_id: string; // UUID
    word_id: number;
    next_review_at: Date; // TIMESTAMP
    interval_ms: number; // BIGINT
    repetitions: number; // INTEGER
    ease_factor: number; // FLOAT
    remembered: boolean; // BOOLEAN
    last_reviewed: Date; // TIMESTAMP
}

export interface IUpdateUserFlashcardDTO {
    user_id?: string; // UUID
    word_id?: number;
    next_review_at?: Date; // TIMESTAMP
    interval_ms?: number; // BIGINT
    repetitions?: number; // INTEGER
    ease_factor?: number; // FLOAT
    remembered?: boolean; // BOOLEAN
    last_reviewed?: Date; // TIMESTAMP
}