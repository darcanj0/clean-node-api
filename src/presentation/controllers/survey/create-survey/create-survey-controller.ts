import { HttpRequest, HttpResponse } from '../../../protocols'
import { badRequest, serverError, IController, IValidation, ICreateSurvey } from './create-survey-controller-protocols'

export class CreateSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly createSurvey: ICreateSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error !== null) {
        return badRequest(error)
      }
      await this.createSurvey.create(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
