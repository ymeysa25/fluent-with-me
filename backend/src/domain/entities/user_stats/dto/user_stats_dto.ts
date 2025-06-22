export interface ICreateUserStatDTO {
    user_id: string; // UUID
    streak_days: number;
    total_xp: number;
}

export interface IUpdateUserStatDTO {
    user_id?: string; // UUID
    streak_days?: number;
    total_xp?: number;
}