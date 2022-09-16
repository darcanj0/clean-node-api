import { InvalidParamError } from '../../../errors'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { CreateSurveyController } from './create-survey-controller'
import { IValidation, badRequest, CreateSurveyData, ICreateSurvey } from './create-survey-controller-protocols'

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

const makeCreateSurveyStub = (): ICreateSurvey => {
  class CreateSurveyStub implements ICreateSurvey {
    async create (createSurveyData: CreateSurveyData): Promise<any> {
      return {}
    }
  }
  return new CreateSurveyStub()
}

interface SutTypes {
  validationStub: IValidation
  createSurveyStub: ICreateSurvey
  sut: CreateSurveyController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const createSurveyStub = makeCreateSurveyStub()
  const sut = new CreateSurveyController(validationStub, createSurveyStub)
  return { sut, validationStub, createSurveyStub }
}

describe('CreateSurveyController', () => {
  test('Should call Validation with correct values ', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest: HttpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation throws with the same error from validation', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const httpRequest: HttpRequest = makeFakeHttpRequest()
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('field')))
  })

  test('Should call CreateSurveyUseCase with correct values ', async () => {
    const { sut, createSurveyStub } = makeSut()
    const useCaseSpy = jest.spyOn(createSurveyStub, 'create')
    const httpRequest: HttpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(useCaseSpy).toHaveBeenCalledWith({
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }]
    })
  })
})
