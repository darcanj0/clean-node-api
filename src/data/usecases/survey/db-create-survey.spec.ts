import { DbCreateSurvey } from './db-create-survey'
import { CreateSurveyData, ICreateSurveyRepository } from './db-create-survey-protocols'

const makeFakeSurveyData = (): CreateSurveyData => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeCreateSurveyRepositoryStub = (): ICreateSurveyRepository => {
  class CreateSurveyRepositoryStub implements ICreateSurveyRepository {
    async add (data: CreateSurveyData): Promise<any> {
      return new Promise(resolve => resolve({}))
    }
  }
  return new CreateSurveyRepositoryStub()
}

interface SutTypes {
  createSurveyRepositoryStub: ICreateSurveyRepository
  sut: DbCreateSurvey
}

const makeSut = (): SutTypes => {
  const createSurveyRepositoryStub = makeCreateSurveyRepositoryStub()
  const sut = new DbCreateSurvey(createSurveyRepositoryStub)
  return { sut, createSurveyRepositoryStub }
}

describe('CreateSurveyUseCase', () => {
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
