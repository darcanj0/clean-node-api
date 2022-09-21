import MockDate from 'mockdate'
import { SaveSurveyResultController } from './save-survey-result-controller'
import {
  HttpRequest, ILoadSurveyById, ISaveSurveyResult,
  SaveSurveyResultModel, SurveyModel, SurveyResultModel
} from './save-survey-result-controller-protocols'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { surveyId: 'any_survey_id' }
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

  // test('Should return 403 if LoadSurveyById returns null', async () => {
  //   const { sut, loadSurveyByIdStub } = makeSut()
  //   jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
  //   const result = await sut.handle(makeFakeHttpRequest())
  //   expect(result).toEqual(forbidden(new InvalidParamError('surveyId')))
  // })
})
