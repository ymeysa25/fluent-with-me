export interface ICreateWordDTO {
    id: number;
    language_id: number;
    word: string;
    image_url: string;
    audio_url: string;
    translation: string;
    category_id: number;
}

export interface IUpdateWordDTO {
    id: number;
    language_id?: number;
    word?: string;
    image_url?: string;
    audio_url?: string;
    translation?: string;
    category_id?: number;
}