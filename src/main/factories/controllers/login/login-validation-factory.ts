import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { IValidation } from '../../../../presentation/protocols/validation'
import { IEmailValidator } from '../../../../validation/protocols/email-validator'
import { EmailValidatorAdapter } from '../../../../infra/adapters/validators/email-validator-adapter'

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
