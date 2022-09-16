import { IValidation } from '../../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { makeCreateSurveyValidation } from './create-survey-validation.factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('CreateSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateSurveyValidation()
    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
