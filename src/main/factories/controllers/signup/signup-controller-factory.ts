import { SignUpController } from '../../../../presentation/controllers/user/signup/signup-controller'
import { IController } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/account/login/db-authentication-usecase-factory'
import { makeDbSignUp } from '../../usecases/account/signup/db-signup-usecase-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): IController => {
  return makeLogControllerDecorator(new SignUpController(makeDbSignUp(), makeSignUpValidation(), makeDbAuthentication()))
}
