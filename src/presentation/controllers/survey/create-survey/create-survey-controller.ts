import { HttpRequest, HttpResponse } from '../../../protocols'
import { badRequest, IController, IValidation, ICreateSurvey } from './create-survey-controller-protocols'

export class CreateSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly createSurvey: ICreateSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error !== null) {
      return badRequest(error)
    }
    await this.createSurvey.create(httpRequest.body)
    return null
  }
}
