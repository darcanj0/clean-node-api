import { makeLogControllerDecorator } from '../../../../../main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '../../../../../main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-usecase-factory'
import { makeDbSaveSurveyResult } from '../../../../../main/factories/usecases/survey/save-survey-result/db-save-survey-result-usecase-factory'
import { SaveSurveyResultController } from '../../../../../presentation/controllers/survey/save-survey-result/save-survey-result-controller'
import { IController } from '../../../../../presentation/protocols'

export const makeSaveSurveyResultController = (): IController => {
  return makeLogControllerDecorator(new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult()))
}
