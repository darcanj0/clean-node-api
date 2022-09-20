import {
  HttpRequest,
  HttpResponse, IController,
  ILoadSurveys, ok, serverError, noContent
} from './load-surveys-controller-protocols'

export class LoadSurveysController implements IController {
  constructor (private readonly loadSurveys: ILoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.loadSurveys()
      if (surveys.length === 0) {
        return noContent()
      }
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
