import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { IController } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys-usecase-factory'

export const makeLoadSurveysController = (): IController => {
  return makeLogControllerDecorator(new LoadSurveysController(makeDbLoadSurveys()))
}
