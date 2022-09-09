import { HttpRequest, HttpResponse, IController } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { ILogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'

interface ISutTypes {
  controllerStub: IController
  sut: LogControllerDecorator
  logErrorRepositoryStub: ILogErrorRepository
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        body: {},
        statusCode: 200
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepository implements ILogErrorRepository {
    async log (stack: string): Promise<void> {
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
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result returned by the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual({
      body: {},
      statusCode: 200
    })
  })

  test('Should call LogErrorRepository with correct error stack if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(serverError(fakeError))))
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logErrorSpy).toHaveBeenCalledWith('any_stack')
  })
})
