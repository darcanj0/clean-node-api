import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field1', 'field2')
}

describe('CompareFields Validation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field1: 'value', field2: 'different_value' })
    expect(error).toEqual(new InvalidParamError('field2'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field1: 'value', field2: 'value' })
    expect(error).toBeFalsy()
  })
})
