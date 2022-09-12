import { IValidation } from './validation'

export class ValidationComposite implements IValidation {
  private readonly validations: IValidation[]
  constructor (validations: IValidation[]) {
    this.validations = validations
  }

  validate (input: any): Error | null {
    this.validations.forEach((validation) => {
      const error = validation.validate(input)
      if (error) return error
    })
    return null
  }
}
