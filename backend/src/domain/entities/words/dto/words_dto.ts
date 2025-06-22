export interface IGetWordsDTO {
    language_id: number;
    category_id: number;
}

export interface ICreateWordDTO {
    language_id: number;
    word: string;
    image_url: string;
    audio_url: string;
    translation_id: string;
    translation_en: string;
    category_id: number;
}

export interface IUpdateWordDTO {
    language_id?: number;
    word?: string;
    image_url?: string;
    audio_url?: string;
    translation_id?: string;
    translation_en?: string;
    category_id?: number;
}
