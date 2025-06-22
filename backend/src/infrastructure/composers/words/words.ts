
import { prismaClient } from '../../databases/connections'

// interface
import { IController } from '../../../domain/interfaces/controller/IController'
import { IWordsRepository } from '../../../domain/interfaces/repositories/words/words'
import {
    ICreateWordUseCase,
    IDeleteWordUseCase,
    IGetAllWordUseCase,
    IUpdateWordUseCase
} from '../../../domain/interfaces/usecases/words/words'

// implementation
import { WordsRepository } from '../../../application/repositories/words/words'

import { CreateWordUseCase } from '../../../application/usecases/words/create_word'
import { DeleteWordUseCase } from '../../../application/usecases/words/delete_word'
import { GetAllWordUseCase } from '../../../application/usecases/words/get_words'
import { UpdateWordUseCase } from '../../../application/usecases/words/update_word'

import { CreateWordController } from '../../controllers/words/create_word'
import { GetWordController } from '../../controllers/words/get_words'
import { DeleteWordController } from '../../controllers/words/delete_word'
import { UpdateWordController } from '../../controllers/words/update_word'


/**
 * Composer function for creating and configuring the components required for user creation.
 *
 * @function
 * @returns {IController} The configured user creation controller.
 */
export function createWordComposer(): IController {
    const repository: IWordsRepository = new WordsRepository(prismaClient)
    const useCase: ICreateWordUseCase = new CreateWordUseCase(
        repository,
    )
    const controller: IController = new CreateWordController(useCase)
    return controller
}


export function deleteWordComposer(): IController {
    const repository: IWordsRepository = new WordsRepository(prismaClient)
    const useCase: IDeleteWordUseCase = new DeleteWordUseCase(repository)
    const controller: IController = new DeleteWordController(useCase)
    return controller
}


export function getWordComposer(): IController {
    const repository: IWordsRepository = new WordsRepository(prismaClient)
    const useCase: IGetAllWordUseCase = new GetAllWordUseCase(repository)
    const controller: IController = new GetWordController(useCase)
    return controller
}


export function updateWordComposer(): IController {
    const repository: IWordsRepository = new WordsRepository(prismaClient)
    const useCase: IUpdateWordUseCase = new UpdateWordUseCase(
        repository,
    )
    const controller: IController = new UpdateWordController(useCase)
    return controller
}