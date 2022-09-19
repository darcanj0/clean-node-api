import { CreateSurveyController } from '../../../../../presentation/controllers/survey/create-survey/create-survey-controller'
import { IController } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbCreateSurvey } from '../../../usecases/survey/create-survey/db-create-survey-usecase-factory'
import { makeCreateSurveyValidation } from './create-survey-validation.factory'

export const makeCreateSurveyController = (): IController => {
  return makeLogControllerDecorator(new CreateSurveyController(makeCreateSurveyValidation(), makeDbCreateSurvey()))
}
