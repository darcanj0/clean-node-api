import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { IValidation } from '../../../../../presentation/protocols/validation'

export const makeCreateSurveyValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
