import { HttpResponse } from '../../../protocols'
import { badRequest, serverError, noContent, IController, IValidation, ICreateSurvey } from './create-survey-controller-protocols'

export class CreateSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly createSurvey: ICreateSurvey
  ) {}

  async handle (request: CreateSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error !== null) {
        return badRequest(error)
      }
      await this.createSurvey.create({ ...request, date: new Date() })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateSurveyController {
  export type Request = {
    question: string
    answers: Answer[]
  }

  type Answer = {
    image?: string
    answer: string
  }
}
