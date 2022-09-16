import { HttpRequest } from '../../../protocols/http'
import { CreateSurveyController } from './create-survey-controller'
import { IValidation } from './create-survey-controller-protocols'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validationStub: IValidation
  sut: CreateSurveyController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new CreateSurveyController(validationStub)
  return { sut, validationStub }
}

describe('CreateSurveyController', () => {
  test('Should call Validation with correct values ', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest: HttpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
