import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return MissinParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ objectWithoutRequiredField: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
