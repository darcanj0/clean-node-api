import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { IValidation } from '../../presentation/helpers/validators/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { IEmailValidator } from '../../presentation/protocols/email-validator'

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
