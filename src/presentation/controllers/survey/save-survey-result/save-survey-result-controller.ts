import {
  HttpRequest,
  HttpResponse,
  IController,
  ILoadSurveyById,
  ISaveSurveyResult,
  serverError,
  forbidden,
  InvalidParamError
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const possibleAnswers = survey.answers.map((elem) => elem.answer)
      const isValidAnswer = possibleAnswers.some((answer) => httpRequest.body.answer === answer)
      if (!isValidAnswer) {
        return forbidden(new InvalidParamError('answer'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
