import { ValidationComposite, CompareFieldsValidation, EmailValidation, RequiredFieldValidation } from '../../../../validation/validators'
import { makeSignUpValidation } from './signup-validation-factory'
import { EmailValidatorAdapter } from '../../../../infra/adapters/validators/email-validator-adapter'
import { IValidation } from '../../../../presentation/protocols/validation'

jest.mock('../../../../validation/validators/validation-composite')

describe('Signup Validation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
