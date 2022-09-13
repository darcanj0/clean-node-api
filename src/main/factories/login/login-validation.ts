import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { IValidation } from '../../../presentation/protocols/validation'
import { IEmailValidator } from '../../../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

const makeEmailValidator = (): IEmailValidator => {
  return new EmailValidatorAdapter()
}

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation(makeEmailValidator(), 'email'))
  return new ValidationComposite(validations)
}
