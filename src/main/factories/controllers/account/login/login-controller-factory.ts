import { LoginController } from '../../../../../presentation/controllers/user/login/login-controller'
import { IController } from '../../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../../usecases/account/login/db-authentication-usecase-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): IController => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}
