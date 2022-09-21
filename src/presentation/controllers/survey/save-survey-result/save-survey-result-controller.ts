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
      const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.saveSurveyResult.save(httpRequest.body)
    } catch (error) {
      return serverError(error)
    }
  }
}
