import { makeLoginValidation } from './login-validation-factory'
import { IValidation } from '../../../../../presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../../validation/validators'
import { EmailValidatorAdapter } from '../../../../../infra/adapters/validators/email-validator-adapter'

jest.mock('../../../../../validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
