
import { prismaClient } from '../../databases/connections'

// interface
import { IController } from '../../../domain/interfaces/controller/IController'
import { ILanguagesRepository } from '../../../domain/interfaces/repositories/languages/languages'
import {
    ICreateLanguageUseCase,
    IDeleteLanguageUseCase,
    IGetAllLanguageUseCase,
    IUpdateLanguageUseCase
} from '../../../domain/interfaces/usecases/languages/languages'

// implementation
import { LanguagesRepository } from '../../../application/repositories/languages/languages'

import { CreateLanguageUseCase } from '../../../application/usecases/languages/create_language'
import { DeleteLanguageUseCase } from '../../../application/usecases/languages/delete_language'
import { GetAllLanguageUseCase } from '../../../application/usecases/languages/get_languages'
import { UpdateLanguageUseCase } from '../../../application/usecases/languages/update_language'

import { CreateLanguageController } from '../../controllers/languages/create_language'
import { GetLanguageController } from '../../controllers/languages/get_languages'
import { DeleteLanguageController } from '../../controllers/languages/delete_language'
import { UpdateLanguageController } from '../../controllers/languages/update_language'


/**
 * Composer function for creating and configuring the components required for user creation.
 *
 * @function
 * @returns {IController} The configured user creation controller.
 */
export function createLanguageComposer(): IController {
    const repository: ILanguagesRepository = new LanguagesRepository(prismaClient)
    const useCase: ICreateLanguageUseCase = new CreateLanguageUseCase(
        repository,
    )
    const controller: IController = new CreateLanguageController(useCase)
    return controller
}


export function deleteLanguageComposer(): IController {
    const repository: ILanguagesRepository = new LanguagesRepository(prismaClient)
    const useCase: IDeleteLanguageUseCase = new DeleteLanguageUseCase(repository)
    const controller: IController = new DeleteLanguageController(useCase)
    return controller
}


export function getLanguageComposer(): IController {
    const repository: ILanguagesRepository = new LanguagesRepository(prismaClient)
    const useCase: IGetAllLanguageUseCase = new GetAllLanguageUseCase(repository)
    const controller: IController = new GetLanguageController(useCase)
    return controller
}


export function updateLanguageComposer(): IController {
    const repository: ILanguagesRepository = new LanguagesRepository(prismaClient)
    const useCase: IUpdateLanguageUseCase = new UpdateLanguageUseCase(
        repository,
    )
    const controller: IController = new UpdateLanguageController(useCase)
    return controller
}