import { HttpRequest, HttpResponse, IController } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface ISutTypes {
  controllerStub: IController
  sut: LogControllerDecorator
}

const makeSut = (): ISutTypes => {
  class ControllerStub implements IController {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        body: {},
        statusCode: 200
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  const controllerStub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut, controllerStub
  }
}

describe('Controller Decorator', () => {
  test('Should call controller handle method', async () => {
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
})
