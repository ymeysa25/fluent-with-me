import { ICreateWordCategoryDTO, IUpdateWordCategoryDTO } from "./dto/word_categories_dto";

export interface IWordCategoryEntity {
    id: number;
    name: string;
    created_at: Date;
}

export class WordCategoryEntity {
    private _name: string

    /**
     * Creates a new word_category instance based on the provided data.
     *
     * @static
     * @param {ICreateWordCategoryRequestDTO} data - The data to create a word_category.
     * @returns {WordCategoryEntity} The created word_category instance.
     */
    static create({ name }: ICreateWordCategoryDTO): WordCategoryEntity {
        return new WordCategoryEntity({ id: 0, name, created_at: new Date() })
    }

    /**
     * Updates the word_category instance with the provided data.
     *
     * @static
     * @param {IUpdateWordCategoryRequestDTO} updatedWordCategory - The data to update the word_category.
     * @returns {IUpdateWordCategoryRequestDTO} The updated word_category data.
     */
    static update(updatedWordCategory: IUpdateWordCategoryDTO): IUpdateWordCategoryDTO {
        return updatedWordCategory
    }

    /**
     * Gets the word_category's name.
     *
     * @readonly
     */
    get name(): string {
        return this._name
    }


    /**
     * Creates an instance of WordCategoryEntity.
     *
     * @constructor
     * @param {WordCategoryInterface} props - The properties of the word_category.
     */
    constructor(props: IWordCategoryEntity) {
        this._name = props.name
    }
}