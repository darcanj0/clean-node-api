import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { IValidation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'
import { IEmailValidator } from '../../../presentation/protocols/email-validator'

const makeEmailValidator = (): IEmailValidator => {
  return new EmailValidatorAdapter()
}

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation(makeEmailValidator(), 'email'))
  return new ValidationComposite(validations)
}
