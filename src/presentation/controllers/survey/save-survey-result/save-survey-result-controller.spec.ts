import MockDate from 'mockdate'
import { SaveSurveyResultController } from './save-survey-result-controller'
import {
  HttpRequest, ILoadSurveyById, ISaveSurveyResult,
  SaveSurveyResultModel, SurveyModel, SurveyResultModel,
  forbidden, InvalidParamError, serverError
} from './save-survey-result-controller-protocols'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { surveyId: 'any_survey_id' },
  body: { answer: 'any_answer' },
  accountId: 'any_account_id'
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_survey_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()

})

const makeFakeSurveyResultModel = (): SurveyResultModel => (
  {
    id: 'any_id',
    date: new Date(),
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer'
  }
)

const makeFakeLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSaveSurveyResultStub = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResultModel()))
    }
  }
  return new SaveSurveyResultStub()
}

type SutTypes = {
  loadSurveyByIdStub: ILoadSurveyById
  saveSurveyResultStub: ISaveSurveyResult
  sut: SaveSurveyResultController
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeFakeLoadSurveyById()
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return { sut, saveSurveyResultStub, loadSurveyByIdStub }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveySpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSurveySpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const result = await sut.handle(makeFakeHttpRequest())
    expect(result).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: { surveyId: 'any_survey_id' },
      body: {
        answer: 'wrong_answer'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveResultSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeHttpRequest())
    expect(saveResultSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: 'any_answer',
      date: new Date()
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
