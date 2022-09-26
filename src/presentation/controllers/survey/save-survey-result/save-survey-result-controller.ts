import {
  HttpResponse,
  IController,
  ILoadSurveyById,
  ISaveSurveyResult,
  serverError,
  forbidden,
  ok,
  InvalidParamError
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { accountId, answer, surveyId } = request
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const possibleAnswers = survey.answers.map((elem) => elem.answer)
      const isValidAnswer = possibleAnswers.some((elem) => elem === answer)
      if (!isValidAnswer) {
        return forbidden(new InvalidParamError('answer'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        answer,
        surveyId,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
