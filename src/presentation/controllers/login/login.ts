import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse, IController } from '../../protocols'
import { IAuthentication } from '../../../domain/usecases/authentication'
import { IEmailValidator } from '../signup/signup-protocols'

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly authenticator: IAuthentication

  constructor (emailValidator: IEmailValidator, authenticator: IAuthentication) {
    this.emailValidator = emailValidator
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authenticator.auth(email, password)

      return new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
