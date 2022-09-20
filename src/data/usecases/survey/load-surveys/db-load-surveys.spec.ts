import { DbLoadSurveys } from './db-load-surveys'
import { ILoadSurveysRepository, SurveyModel } from './db-load-surveys-protocols'
import MockDate from 'mockdate'

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

const makeLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadSurveys (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

interface SutTypes {
  loadSurveysRepositoryStub: ILoadSurveysRepository
  sut: DbLoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return { sut, loadSurveysRepositoryStub }
}

describe('LoadSurveysUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const repoSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    await sut.loadSurveys()
    expect(repoSpy).toHaveBeenCalled()
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { loadSurveysRepositoryStub, sut } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadSurveys()
    await expect(promise).rejects.toThrow()
  })
})
