import { HttpRequest, HttpResponse } from '../../../protocols'
import { badRequest, IController, IValidation } from './create-survey-controller-protocols'

export class CreateSurveyController implements IController {
  constructor (
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error !== null) {
      return badRequest(error)
    }
    return null
  }
}
