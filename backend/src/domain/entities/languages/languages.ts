import { ICreateLanguageDTO, IUpdateLanguageDTO } from "./dto/languages_dto";

export interface ILanguageEntity {
    id: number;
    code: string;
    name: string;
    image_url: string;
    created_at: Date; 
}

export class LanguageEntity {
    private _name: string
    private _code: string
    private _image_url: string

    /**
     * Creates a new language instance based on the provided data.
     *
     * @static
     * @param {ICreateLanguageRequestDTO} data - The data to create a language.
     * @returns {LanguageEntity} The created language instance.
     */
    static create({ code, name, image_url}: ICreateLanguageDTO): LanguageEntity {
        return new LanguageEntity({ id: 0, code, name, image_url, created_at: new Date() })
    }

    /**
     * Updates the language instance with the provided data.
     *
     * @static
     * @param {IUpdateLanguageRequestDTO} updatedLanguage - The data to update the language.
     * @returns {IUpdateLanguageRequestDTO} The updated language data.
     */
    static update(updatedLanguage: IUpdateLanguageDTO): IUpdateLanguageDTO {
        return updatedLanguage
    }
    /**
     * Gets the language's cpde.
     *
     * @readonly
     */
    get code(): string {
        return this._code
    }

    /**
     * Gets the language's name.
     *
     * @readonly
     */
    get name(): string {
        return this._name
    }

    /**
     * Gets the language's image_url.
     *
     * @readonly
     */
    get image_url(): string {
        return this._image_url
    }


    /**
     * Creates an instance of LanguageEntity.
     *
     * @constructor
     * @param {LanguageInterface} props - The properties of the language.
     */
    constructor(props: ILanguageEntity) {
        this._name = props.name
        this._code = props.name
        this._image_url = props.image_url
    }
}