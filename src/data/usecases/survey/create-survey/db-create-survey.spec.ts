import { DbCreateSurvey } from './db-create-survey'
import { ICreateSurveyRepository, ICreateSurvey } from './db-create-survey-protocols'
import MockDate from 'mockdate'

const makeFakeSurveyData = (): ICreateSurvey.Params => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeCreateSurveyRepositoryStub = (): ICreateSurveyRepository => {
  class CreateSurveyRepositoryStub implements ICreateSurveyRepository {
    async add (data: ICreateSurvey.Params): Promise<ICreateSurvey.Result> {
      return new Promise(resolve => resolve({}))
    }
  }
  return new CreateSurveyRepositoryStub()
}

type SutTypes = {
  createSurveyRepositoryStub: ICreateSurveyRepository
  sut: DbCreateSurvey
}

const makeSut = (): SutTypes => {
  const createSurveyRepositoryStub = makeCreateSurveyRepositoryStub()
  const sut = new DbCreateSurvey(createSurveyRepositoryStub)
  return { sut, createSurveyRepositoryStub }
}

describe('CreateSurveyUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CreateSurveyRepository with correct values', async () => {
    const { sut, createSurveyRepositoryStub } = makeSut()
    const repoSpy = jest.spyOn(createSurveyRepositoryStub, 'add')
    const createSurveyData = makeFakeSurveyData()
    await sut.create(createSurveyData)
    expect(repoSpy).toHaveBeenCalledWith(createSurveyData)
  })

  test('Should throw if CreateSurveyRepository throws', async () => {
    const { createSurveyRepositoryStub, sut } = makeSut()
    jest.spyOn(createSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
