import { InvalidParamError } from '../../../errors'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { CreateSurveyController } from './create-survey-controller'
import { badRequest, serverError, noContent, CreateSurveyData, ICreateSurvey, IValidation } from './create-survey-controller-protocols'
import MockDate from 'mockdate'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
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
      return new Promise(resolve => resolve({}))
    }
  }
  return new CreateSurveyStub()
}

type SutTypes = {
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

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
      }],
      date: new Date()
    })
  })

  test('Should return 500 if CreateSurvey throws', async () => {
    const { sut, createSurveyStub } = makeSut()
    jest.spyOn(createSurveyStub, 'create').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httpRequest = makeFakeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
