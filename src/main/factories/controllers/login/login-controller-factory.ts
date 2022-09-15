import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { IController } from '../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/login/db-authentication-usecase-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): IController => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}
