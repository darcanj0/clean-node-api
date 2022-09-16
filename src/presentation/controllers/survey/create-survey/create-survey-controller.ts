import { HttpRequest, HttpResponse } from '../../../protocols'
import { IController, IValidation } from './create-survey-controller-protocols'

export class CreateSurveyController implements IController {
  constructor (
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}
