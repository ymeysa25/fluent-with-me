export interface IUserStatEntity {
    user_id: string; // UUID
    streak_days: number;
    total_xp: number;
    created_at: Date;
}
