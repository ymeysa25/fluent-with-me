export interface IWordEntity {
    id: number;
    language_id: number;
    word: string;
    image_url?: string;
    audio_url?: string;
    translation?: string;
    category_id: number;
    created_at: Date;
}
