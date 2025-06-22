import { ICreateWordDTO, IUpdateWordDTO } from "./dto/words_dto";

export interface IWordEntity {
    id: number;
    language_id: number;
    word: string;
    image_url?: string;
    audio_url?: string;
    translation_id?: string;
    translation_en?: string;
    category_id: number;
    created_at: Date;
}


export class WordEntity {
    private _language_id: number;
    private _word: string;
    private _image_url: string;
    private _audio_url: string;
    private _translation_id: string;
    private _translation_en: string;
    private _category_id: number;

    /**
     * Creates a new word instance based on the provided data.
     *
     * @static
     * @param {ICreateWordRequestDTO} data - The data to create a word.
     * @returns {WordEntity} The created word instance.
     */
    static create({ language_id, word, image_url, audio_url, translation_id, translation_en, category_id }: ICreateWordDTO): WordEntity {
        return new WordEntity({ id: 0, language_id, word, image_url, audio_url, translation_id, translation_en, category_id, created_at: new Date() })
    }

    /**
     * Updates the word instance with the provided data.
     *
     * @static
     * @param {IUpdateWordRequestDTO} updatedWord - The data to update the word.
     * @returns {IUpdateWordRequestDTO} The updated word data.
     */
    static update(updatedWord: IUpdateWordDTO): IUpdateWordDTO {
        return updatedWord
    }
    /**
     * Gets the word's language_id.
     *
     * @readonly
     */
    get language_id(): number {
        return this._language_id
    }

    /**
     * Gets the word's word.
     *
     * @readonly
     */
    get word(): string {
        return this._word
    }

    /**
     * Gets the word's image_url.
     *
     * @readonly
     */
    get image_url(): string {
        return this._image_url
    }

    /**
     * Gets the word's audio_url.
     *
     * @readonly
     */
    get audio_url(): string {
        return this._audio_url
    }

    /**
    * Gets the word's translation_id.
    *
    * @readonly
    */
    get translation_id(): string {
        return this._translation_id
    }

     /**
    * Gets the word's translation_end.
    *
    * @readonly
    */
     get translation_en(): string {
        return this._translation_en
    }

    /**
   * Gets the word's category_id.
   *
   * @readonly
   */
    get category_id(): number {
        return this._category_id
    }


    /**
     * Creates an instance of WordEntity.
     *
     * @constructor
     * @param {WordInterface} props - The properties of the word.
     */
    constructor(props: IWordEntity) {
        this._language_id = props.language_id
        this._word = props.word
        this._image_url = props.image_url
        this._audio_url = props.audio_url
        this._translation_id = props.translation_id
        this._translation_en = props.translation_en
        this._category_id = props.category_id
    }
}