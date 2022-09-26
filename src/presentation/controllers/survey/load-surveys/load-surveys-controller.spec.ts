import MockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { ILoadSurveys, ok, serverError, noContent, SurveyModel } from './load-surveys-controller-protocols'

const makeFakeHttpRequest = (): LoadSurveysController.Request => ({
  accountId: 'any_account_id'
})

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'another_id',
    question: 'another_question',
    answers: [{
      answer: 'another_answer'
    }],
    date: new Date()
  }
])

const makeLoadSurveysStub = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async loadSurveys (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

type SutTypes = {
  loadSurveysStub: ILoadSurveys
  sut: LoadSurveysController
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return { sut, loadSurveysStub }
}

describe('LoadSurveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysUseCase', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const useCaseSpy = jest.spyOn(loadSurveysStub, 'loadSurveys')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    expect(useCaseSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadSurveysUseCase throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadSurveys').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const request = makeFakeHttpRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on LoadSurveysUseCase success', async () => {
    const { sut } = makeSut()
    const request = makeFakeHttpRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if there are no surveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadSurveys').mockReturnValueOnce(
      new Promise((resolve) => resolve([]))
    )
    const request = makeFakeHttpRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })
})
