import { HttpRequest, HttpResponse, IController } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { ILogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { serverError, ok } from '../../presentation/helpers/http/http-helper'
import { AccountModel } from '../../domain/models/account'

interface ISutTypes {
  controllerStub: IController
  sut: LogControllerDecorator
  logErrorRepositoryStub: ILogErrorRepository
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = ok(makeFakeAccount())
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepository implements ILogErrorRepository {
    async logError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepository()
}

const makeSut = (): ISutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut, controllerStub, logErrorRepositoryStub
  }
}

describe('Controller Decorator', () => {
  test('Should call controller handle method with correct value', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result returned by the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error stack if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(logErrorSpy).toHaveBeenCalledWith('any_stack')
  })
})
