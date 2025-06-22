export interface ICreateLanguageDTO {
    code: string;
    name: string;
}

export interface IUpdateLanguageDTO {
    code?: string;
    name?: string;
}